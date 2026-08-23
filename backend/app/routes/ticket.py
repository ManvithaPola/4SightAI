from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from sqlalchemy import or_
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import (
    TicketCreate,
    TicketResponse,
    TicketUpdate,
)
from app.ai.provider import ai_service
from app.models.ai_suggestion import AISuggestion
from app.models.activity import Activity
from app.models.team import Team
from app.schemas.ai import AIReviewRequest
from app.schemas.assignment import AssignmentRequest
from app.schemas.status import StatusUpdate
from app.services.ticket_status import is_valid_transition
from app.models.activity import Activity
from app.schemas.activity import ActivityResponse
from app.schemas.ai import AISuggestionResponse
from app.schemas.ticket import TicketListResponse
from app.schemas.ai import GlobalAISuggestionResponse
from app.schemas.activity import GlobalActivityResponse
router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)

@router.post(
    "",
    response_model=TicketResponse,
    status_code=status.HTTP_201_CREATED
)
def create_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    ticket = Ticket(
        customer_name=ticket_data.customer_name,
        customer_email=ticket_data.customer_email,
        subject=ticket_data.subject,
        description=ticket_data.description,
        product_module=ticket_data.product_module,
        attachment_url=ticket_data.attachment_url,
        status="OPEN",
        created_by=current_user.id
    )

    # Add ticket first
    db.add(ticket)

    # Generate the ticket ID without committing
    db.flush()

    # Record ticket creation in activity timeline
    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="TICKET_CREATED",
        description="Ticket created."
    )

    db.add(activity)

    # Save both ticket + activity together
    db.commit()

    # Refresh ticket from database
    db.refresh(ticket)

    return ticket

@router.get(
    "",
    response_model=TicketListResponse
)
def get_tickets(
    search: str | None = Query(
        default=None,
        description="Search by customer name, email, subject, or description"
    ),

    status_filter: str | None = Query(
        default=None,
        alias="status"
    ),

    priority: str | None = Query(
        default=None
    ),

    category: str | None = Query(
        default=None
    ),

    team: int | None = Query(
        default=None,
        description="Filter by assigned team ID"
    ),

    page: int = Query(
        default=1,
        ge=1
    ),

    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    # -------------------------
    # START QUERY
    # -------------------------

    query = db.query(Ticket)

    # -------------------------
    # SEARCH
    # -------------------------

    if search:

        search_value = f"%{search.strip()}%"

        query = query.filter(
            or_(
                Ticket.customer_name.ilike(search_value),
                Ticket.customer_email.ilike(search_value),
                Ticket.subject.ilike(search_value),
                Ticket.description.ilike(search_value)
            )
        )

    # -------------------------
    # STATUS FILTER
    # -------------------------

    if status_filter:

        query = query.filter(
            Ticket.status == status_filter
        )

    # -------------------------
    # PRIORITY FILTER
    # -------------------------

    if priority:

        query = query.filter(
            Ticket.priority == priority
        )

    # -------------------------
    # CATEGORY FILTER
    # -------------------------

    if category:

        query = query.filter(
            Ticket.category == category
        )

    # -------------------------
    # TEAM FILTER
    # -------------------------

    if team is not None:

        query = query.filter(
            Ticket.assigned_team_id == team
        )

    # -------------------------
    # TOTAL COUNT
    # -------------------------

    total = query.count()

    # -------------------------
    # PAGINATION
    # -------------------------

    offset = (page - 1) * limit

    tickets = (
        query
        .order_by(Ticket.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    # -------------------------
    # TOTAL PAGES
    # -------------------------

    total_pages = (
        (total + limit - 1) // limit
        if total > 0
        else 0
    )

    # -------------------------
    # BUILD RESPONSE
    # -------------------------

    ticket_items = []

    for ticket in tickets:

        # -------------------------
        # GET ASSIGNED TEAM
        # -------------------------

        assigned_team = None

        if ticket.assigned_team_id:

            assigned_team = (
                db.query(Team)
                .filter(
                    Team.id == ticket.assigned_team_id
                )
                .first()
            )

        # -------------------------
        # GET ASSIGNED USER
        # -------------------------

        assigned_user = None

        if ticket.assigned_user_id:

            assigned_user = (
                db.query(User)
                .filter(
                    User.id == ticket.assigned_user_id
                )
                .first()
            )

        # -------------------------
        # CREATE TICKET RESPONSE
        # -------------------------

        ticket_items.append(
            TicketResponse(

                id=ticket.id,

                customer_name=ticket.customer_name,

                customer_email=ticket.customer_email,

                subject=ticket.subject,

                description=ticket.description,

                product_module=ticket.product_module,

                attachment_url=ticket.attachment_url,

                category=ticket.category,

                priority=ticket.priority,

                priority_reason=ticket.priority_reason,

                assigned_team_id=ticket.assigned_team_id,

                assigned_user_id=ticket.assigned_user_id,

                assigned_team_name=(
                    assigned_team.name
                    if assigned_team
                    else None
                ),

                assigned_user_name=(
                    assigned_user.name
                    if assigned_user
                    else None
                ),

                status=ticket.status,

                created_by=ticket.created_by,

                created_at=ticket.created_at,

                updated_at=ticket.updated_at
            )
        )

    # -------------------------
    # FINAL RESPONSE
    # -------------------------

    return TicketListResponse(

        items=ticket_items,

        total=total,

        page=page,

        limit=limit,

        total_pages=total_pages
    )
    
    
@router.get(
    "/ai-suggestions",
    response_model=list[GlobalAISuggestionResponse]
)
def get_all_ai_suggestions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    suggestions = (
        db.query(
            AISuggestion,
            Ticket.subject,
            Ticket.customer_name,
            Team.name
        )
        .join(
            Ticket,
            AISuggestion.ticket_id == Ticket.id
        )
        .outerjoin(
            Team,
            AISuggestion.recommended_team_id == Team.id
        )
        .order_by(
            AISuggestion.created_at.desc()
        )
        .all()
    )

    return [
    {
        "id": suggestion.id,
        "ticket_id": suggestion.ticket_id,
        "summary": suggestion.summary,
        "category": suggestion.category,
        "priority": suggestion.priority,
        "priority_reason": suggestion.priority_reason,
        "recommended_team_id": suggestion.recommended_team_id,
        "recommended_team": team_name,
        "suggested_response": suggestion.suggested_response,
        "status": suggestion.status,
        "model_provider": suggestion.model_provider,
        "model_name": suggestion.model_name,
        "created_at": suggestion.created_at,
        "ticket_subject": ticket_subject,
        "customer_name": customer_name,
    }
    for (
        suggestion,
        ticket_subject,
        customer_name,
        team_name
    ) in suggestions
]
    
@router.get(
    "/activities",
    response_model=list[GlobalActivityResponse]
)
def get_all_activities(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    activities = (
        db.query(
            Activity,
            User.name,
            Ticket.subject
        )
        .outerjoin(
            User,
            Activity.user_id == User.id
        )
        .join(
            Ticket,
            Activity.ticket_id == Ticket.id
        )
        .order_by(
            Activity.created_at.desc()
        )
        .all()
    )

    return [
        {
            "id": activity.id,
            "ticket_id": activity.ticket_id,
            "user_id": activity.user_id,
            "activity_type": activity.activity_type,
            "description": activity.description,
            "metadata_json": activity.metadata_json,
            "created_at": activity.created_at,
            "user_name": user_name,
            "ticket_subject": ticket_subject,
        }
        for (
            activity,
            user_name,
            ticket_subject
        ) in activities
    ]

@router.get(
    "/{ticket_id}",
    response_model=TicketResponse
)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    # Get assigned team
    assigned_team = None

    if ticket.assigned_team_id:
        assigned_team = (
            db.query(Team)
            .filter(Team.id == ticket.assigned_team_id)
            .first()
        )

    # Get assigned user
    assigned_user = None

    if ticket.assigned_user_id:
        assigned_user = (
            db.query(User)
            .filter(User.id == ticket.assigned_user_id)
            .first()
        )

    return TicketResponse(
        id=ticket.id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        product_module=ticket.product_module,
        attachment_url=ticket.attachment_url,
        category=ticket.category,
        priority=ticket.priority,
        priority_reason=ticket.priority_reason,
        assigned_team_id=ticket.assigned_team_id,
        assigned_team_name=(
            assigned_team.name
            if assigned_team
            else None
        ),
        assigned_user_id=ticket.assigned_user_id,
        assigned_user_name=(
            assigned_user.name
            if assigned_user
            else None
        ),
        status=ticket.status,
        created_by=ticket.created_by,
        created_at=ticket.created_at,
        updated_at=ticket.updated_at,
    )

@router.put(
    "/{ticket_id}",
    response_model=TicketResponse
)
def update_ticket(
    ticket_id: int,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    update_data = ticket_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(ticket, field, value)

    db.commit()
    db.refresh(ticket)

    return ticket

@router.post(
    "/{ticket_id}/analyze"
)
def analyze_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    try:
        analysis = ai_service.analyze_ticket(
            subject=ticket.subject,
            description=ticket.description
        )

        team = (
            db.query(Team)
            .filter(
                Team.name == analysis.recommended_team
            )
            .first()
        )

        suggestion = AISuggestion(
            ticket_id=ticket.id,
            summary=analysis.summary,
            category=analysis.category,
            priority=analysis.priority,
            priority_reason=analysis.priority_reason,
            recommended_team_id=team.id if team else None,
            suggested_response=analysis.suggested_response,
            status="PENDING",
            model_provider=ai_service.provider_name,
            model_name=ai_service.model_name
        )

        db.add(suggestion)

        activity = Activity(
            ticket_id=ticket.id,
            user_id=current_user.id,
            activity_type="AI_ANALYSIS_COMPLETED",
            description="AI analysis completed successfully.",
        )

        db.add(activity)

        db.commit()
        db.refresh(suggestion)

        return {
            "message": "AI analysis completed",
            "suggestion": {
                "id": suggestion.id,
                "summary": suggestion.summary,
                "category": suggestion.category,
                "priority": suggestion.priority,
                "priority_reason": suggestion.priority_reason,
                "recommended_team": analysis.recommended_team,
                "suggested_response": suggestion.suggested_response,
                "status": suggestion.status
            }
        }

    except Exception as e:
        db.rollback()

        activity = Activity(
            ticket_id=ticket.id,
            user_id=current_user.id,
            activity_type="AI_ANALYSIS_FAILED",
            description="AI analysis failed."
        )

        db.add(activity)
        db.commit()

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI analysis is currently unavailable."
        )
        
@router.put(
    "/{ticket_id}/review"
)
def review_ai_suggestion(
    ticket_id: int,
    review_data: AIReviewRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    # Get the latest pending AI suggestion
    suggestion = (
        db.query(AISuggestion)
        .filter(
            AISuggestion.ticket_id == ticket_id,
            AISuggestion.status == "PENDING"
        )
        .order_by(AISuggestion.created_at.desc())
        .first()
    )

    if suggestion is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No pending AI suggestion found"
        )

    # Validate team if provided
    team = None

    if review_data.recommended_team_id is not None:

        team = (
            db.query(Team)
            .filter(
                Team.id == review_data.recommended_team_id,
                Team.is_active == True
            )
            .first()
        )

        if team is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid team"
            )

    # Update final human-confirmed ticket values
    ticket.category = review_data.category
    ticket.priority = review_data.priority
    ticket.priority_reason = review_data.priority_reason

    if team:
        ticket.assigned_team_id = team.id

    # Mark AI suggestion as accepted
    suggestion.status = "ACCEPTED"

    # Record activity
    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="AI_SUGGESTIONS_ACCEPTED",
        description=(
            "AI suggestions reviewed and accepted "
            "by the user."
        )
    )

    db.add(activity)

    db.commit()

    db.refresh(ticket)
    db.refresh(suggestion)

    return {
        "message": "AI suggestions reviewed successfully",
        "ticket": {
            "id": ticket.id,
            "category": ticket.category,
            "priority": ticket.priority,
            "priority_reason": ticket.priority_reason,
            "assigned_team_id": ticket.assigned_team_id,
            "status": ticket.status
        },
        "ai_suggestion": {
            "id": suggestion.id,
            "status": suggestion.status
        }
    }
    
@router.post(
    "/{ticket_id}/review/reject"
)
def reject_ai_suggestion(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    suggestion = (
        db.query(AISuggestion)
        .filter(
            AISuggestion.ticket_id == ticket_id,
            AISuggestion.status == "PENDING"
        )
        .order_by(AISuggestion.created_at.desc())
        .first()
    )

    if suggestion is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No pending AI suggestion found"
        )

    # Reject the AI suggestion
    suggestion.status = "REJECTED"

    # Record audit activity
    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="AI_SUGGESTIONS_REJECTED",
        description="AI suggestions were rejected by the user."
    )

    db.add(activity)
    db.commit()

    db.refresh(suggestion)

    return {
        "message": "AI suggestion rejected",
        "ticket_id": ticket.id,
        "ai_suggestion": {
            "id": suggestion.id,
            "status": suggestion.status
        }
    }
    
@router.put(
    "/{ticket_id}/assignment"
)
def assign_ticket(
    ticket_id: int,
    assignment: AssignmentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    # Validate team
    team = (
        db.query(Team)
        .filter(
            Team.id == assignment.team_id,
            Team.is_active == True
        )
        .first()
    )

    if team is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or inactive team"
        )

    # Validate user if provided
    assigned_user = None

    if assignment.user_id is not None:

        assigned_user = (
            db.query(User)
            .filter(
                User.id == assignment.user_id,
                User.is_active == True
            )
            .first()
        )

        if assigned_user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or inactive user"
            )

        # Critical validation:
        # User must belong to selected team
        if assigned_user.team_id != team.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Selected user does not belong to the selected team"
            )

    # Update ticket
    ticket.assigned_team_id = team.id
    ticket.assigned_user_id = (
        assigned_user.id
        if assigned_user
        else None
    )

    # If a user is assigned, move ticket to ASSIGNED
    if assigned_user:
        ticket.status = "ASSIGNED"

    activity_description = (
        f"Ticket assigned to {team.name}"
    )

    if assigned_user:
        activity_description += (
            f" and user {assigned_user.name}"
        )

    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="TICKET_ASSIGNED",
        description=activity_description
    )

    db.add(activity)

    db.commit()
    db.refresh(ticket)

    return {
        "message": "Ticket assignment updated",
        "ticket": {
            "id": ticket.id,
            "assigned_team_id": ticket.assigned_team_id,
            "assigned_user_id": ticket.assigned_user_id,
            "status": ticket.status
        }
    }
    
@router.put(
    "/{ticket_id}/status"
)
def update_ticket_status(
    ticket_id: int,
    status_data: StatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    current_status = ticket.status
    new_status = status_data.status

    if current_status == new_status:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ticket is already in this status"
        )

    if not is_valid_transition(
        current_status,
        new_status
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Invalid status transition: "
                f"{current_status} → {new_status}"
            )
        )

    ticket.status = new_status

    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="STATUS_CHANGED",
        description=(
            f"Status changed from "
            f"{current_status} to {new_status}."
        )
    )

    db.add(activity)

    db.commit()
    db.refresh(ticket)

    return {
        "message": "Ticket status updated",
        "ticket": {
            "id": ticket.id,
            "status": ticket.status
        }
    }
    

@router.get(
    "/{ticket_id}/activities",
    response_model=list[ActivityResponse]
)
def get_ticket_activities(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    activities = (
        db.query(Activity)
        .filter(Activity.ticket_id == ticket_id)
        .order_by(Activity.created_at.asc())
        .all()
    )

    return activities

@router.get(
    "/{ticket_id}/ai-suggestions",
    response_model=list[AISuggestionResponse]
)
def get_ai_suggestions(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check whether ticket exists
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    # Get AI suggestions with team information
    suggestions = (
        db.query(AISuggestion, Team)
        .outerjoin(
            Team,
            AISuggestion.recommended_team_id == Team.id
        )
        .filter(
            AISuggestion.ticket_id == ticket_id
        )
        .order_by(
            AISuggestion.created_at.desc()
        )
        .all()
    )

    result = []

    for suggestion, team in suggestions:

        result.append(
            AISuggestionResponse(
                id=suggestion.id,
                ticket_id=suggestion.ticket_id,
                summary=suggestion.summary,
                category=suggestion.category,
                priority=suggestion.priority,
                priority_reason=suggestion.priority_reason,
                recommended_team=(
                    team.name
                    if team
                    else None
                ),
                suggested_response=suggestion.suggested_response,
                status=suggestion.status,
                model_provider=suggestion.model_provider,
                model_name=suggestion.model_name,
                created_at=suggestion.created_at
            )
        )

    return result