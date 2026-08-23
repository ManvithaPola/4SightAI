from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.activity import Activity
from app.models.comment import Comment
from app.models.ticket import Ticket
from app.models.user import User

from app.schemas.comment import (
    CommentCreate,
    CommentResponse,
)


router = APIRouter(
    prefix="/tickets/{ticket_id}/comments",
    tags=["Comments"]
)


@router.post(
    "",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED
)
def create_comment(
    ticket_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check ticket
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

    # Create comment
    comment = Comment(
        ticket_id=ticket.id,
        author_id=current_user.id,
        content=comment_data.content
    )

    db.add(comment)

    # Activity timeline
    activity = Activity(
        ticket_id=ticket.id,
        user_id=current_user.id,
        activity_type="COMMENT_ADDED",
        description="Internal comment added."
    )

    db.add(activity)

    db.commit()
    db.refresh(comment)

    return CommentResponse(
        id=comment.id,
        ticket_id=comment.ticket_id,
        author_id=comment.author_id,
        author_name=current_user.name,
        content=comment.content,
        created_at=comment.created_at,
        updated_at=comment.updated_at
    )


@router.get(
    "",
    response_model=list[CommentResponse]
)
def get_comments(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check ticket
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

    comments = (
        db.query(Comment)
        .filter(Comment.ticket_id == ticket_id)
        .order_by(Comment.created_at.asc())
        .all()
    )

    response = []

    for comment in comments:

        author = (
            db.query(User)
            .filter(User.id == comment.author_id)
            .first()
        )

        response.append(
            CommentResponse(
                id=comment.id,
                ticket_id=comment.ticket_id,
                author_id=comment.author_id,
                author_name=(
                    author.name
                    if author
                    else "Unknown User"
                ),
                content=comment.content,
                created_at=comment.created_at,
                updated_at=comment.updated_at
            )
        )

    return response