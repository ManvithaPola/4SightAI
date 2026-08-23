from pydantic import BaseModel


class AssignmentRequest(BaseModel):
    team_id: int
    user_id: int | None = None