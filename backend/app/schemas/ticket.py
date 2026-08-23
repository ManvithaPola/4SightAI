from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TicketCreate(BaseModel):
    customer_name: str = Field(
        ...,
        min_length=1,
        max_length=100
    )

    customer_email: EmailStr

    subject: str = Field(
        ...,
        min_length=10,
        max_length=200
    )

    description: str = Field(
        ...,
        min_length=30
    )

    product_module: str | None = Field(
        default=None,
        max_length=100
    )

    attachment_url: str | None = Field(
        default=None,
        max_length=500
    )


class TicketUpdate(BaseModel):
    customer_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100
    )

    customer_email: EmailStr | None = None

    subject: str | None = Field(
        default=None,
        min_length=10,
        max_length=200
    )

    description: str | None = Field(
        default=None,
        min_length=30
    )

    product_module: str | None = Field(
        default=None,
        max_length=100
    )

    attachment_url: str | None = Field(
        default=None,
        max_length=500
    )

    category: str | None = None
    priority: str | None = None
    priority_reason: str | None = None


class TicketResponse(BaseModel):
    id: int

    customer_name: str
    customer_email: EmailStr

    subject: str
    description: str

    product_module: str | None
    attachment_url: str | None

    category: str | None
    priority: str | None
    priority_reason: str | None

    assigned_team_id: int | None
    assigned_user_id: int | None
    assigned_team_name: str | None = None
    assigned_user_name: str | None = None

    status: str

    created_by: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
    
class TicketListResponse(BaseModel):

    items: list[TicketResponse]

    total: int

    page: int

    limit: int

    total_pages: int