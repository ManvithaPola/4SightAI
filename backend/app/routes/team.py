from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.team import Team
from app.models.user import User
from app.schemas.team import TeamResponse


router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)


@router.get(
    "",
    response_model=list[TeamResponse]
)
def get_teams(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    teams = (
        db.query(Team)
        .order_by(Team.name.asc())
        .all()
    )

    return teams