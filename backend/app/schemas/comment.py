from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CommentCreate(BaseModel):
    content: str = Field(
        ...,
        min_length=1,
        max_length=2000
    )


class CommentResponse(BaseModel):
    id: int
    ticket_id: int
    author_id: int
    author_name: str
    content: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )