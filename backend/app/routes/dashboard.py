from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.ticket import Ticket
from app.models.user import User
from app.models.team import Team
from app.schemas.dashboard import (
    DashboardSummaryResponse,
    RecentTicketResponse,
    TeamPerformanceResponse
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/summary",
    response_model=DashboardSummaryResponse
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    total_tickets = (
        db.query(Ticket)
        .count()
    )

    open_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "OPEN")
        .count()
    )

    assigned_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "ASSIGNED")
        .count()
    )

    in_progress_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "IN_PROGRESS")
        .count()
    )

    waiting_for_customer_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "WAITING_FOR_CUSTOMER")
        .count()
    )

    resolved_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "RESOLVED")
        .count()
    )

    closed_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "CLOSED")
        .count()
    )

    critical_tickets = (
        db.query(Ticket)
        .filter(Ticket.priority == "Critical")
        .count()
    )

    return DashboardSummaryResponse(
        total_tickets=total_tickets,
        open_tickets=open_tickets,
        assigned_tickets=assigned_tickets,
        in_progress_tickets=in_progress_tickets,
        waiting_for_customer_tickets=waiting_for_customer_tickets,
        resolved_tickets=resolved_tickets,
        closed_tickets=closed_tickets,
        critical_tickets=critical_tickets
    )

@router.get(
    "/recent-tickets",
    response_model=list[RecentTicketResponse]
)
def get_recent_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    tickets = (
        db.query(Ticket)
        .order_by(Ticket.created_at.desc())
        .limit(10)
        .all()
    )

    return [
        RecentTicketResponse(
            id=ticket.id,
            customer_name=ticket.customer_name,
            subject=ticket.subject,
            category=ticket.category,
            priority=ticket.priority,
            status=ticket.status,
            created_at=ticket.created_at
        )
        for ticket in tickets
    ]
    
@router.get(
    "/team-performance",
    response_model=list[TeamPerformanceResponse]
)
def get_team_performance(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    teams = (
        db.query(Team)
        .order_by(Team.name.asc())
        .all()
    )

    result = []

    for team in teams:

        total_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id
            )
            .count()
        )

        open_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "OPEN"
            )
            .count()
        )

        assigned_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "ASSIGNED"
            )
            .count()
        )

        in_progress_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "IN_PROGRESS"
            )
            .count()
        )

        waiting_for_customer_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "WAITING_FOR_CUSTOMER"
            )
            .count()
        )

        resolved_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "RESOLVED"
            )
            .count()
        )

        closed_tickets = (
            db.query(Ticket)
            .filter(
                Ticket.assigned_team_id == team.id,
                Ticket.status == "CLOSED"
            )
            .count()
        )

        result.append(
            TeamPerformanceResponse(
                team_id=team.id,
                team_name=team.name,
                total_tickets=total_tickets,
                open_tickets=open_tickets,
                assigned_tickets=assigned_tickets,
                in_progress_tickets=in_progress_tickets,
                waiting_for_customer_tickets=waiting_for_customer_tickets,
                resolved_tickets=resolved_tickets,
                closed_tickets=closed_tickets
            )
        )

    return result