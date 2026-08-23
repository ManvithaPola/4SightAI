from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.team import Team
from app.schemas.user import UserResponse


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "",
    response_model=list[UserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    results = (
        db.query(User, Team.name)
        .outerjoin(
            Team,
            User.team_id == Team.id
        )
        .order_by(User.name.asc())
        .all()
    )

    return [
        UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            team_id=user.team_id,
            team_name=team_name
        )
        for user, team_name in results
    ]