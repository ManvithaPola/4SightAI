from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    team_id: int | None = None
    team_name: str | None = None

    model_config = ConfigDict(
        from_attributes=True
    )