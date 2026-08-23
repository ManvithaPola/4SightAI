from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ActivityResponse(BaseModel):
    id: int
    ticket_id: int
    user_id: int | None
    activity_type: str
    description: str
    metadata_json: str | None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
    


class GlobalActivityResponse(BaseModel):
    id: int
    ticket_id: int
    user_id: int | None
    activity_type: str
    description: str
    metadata_json: str | None
    created_at: datetime

    # Related information for global activity feed
    user_name: str | None = None
    ticket_subject: str | None = None

    model_config = {
        "from_attributes": True
    }