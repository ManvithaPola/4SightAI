from typing import Literal
from datetime import datetime

from pydantic import BaseModel, Field


Category = Literal[
    "Authentication",
    "Billing",
    "Performance",
    "Data Issue",
    "Integration",
    "User Interface",
    "Access Request",
    "Feature Request",
    "Security",
    "General Support",
    "Unknown",
]


Priority = Literal[
    "Low",
    "Medium",
    "High",
    "Critical",
]


RecommendedTeam = Literal[
    "Platform Engineering",
    "Application Engineering",
    "Security",
    "DevOps",
    "Database Team",
    "Billing Team",
    "Customer Support",
    "Product Team",
]


class AIAnalysisResponse(BaseModel):

    summary: str = Field(
        ...,
        min_length=1,
        max_length=1000
    )

    category: Category

    priority: Priority

    priority_reason: str = Field(
        ...,
        min_length=1,
        max_length=500
    )

    recommended_team: RecommendedTeam

    suggested_response: str = Field(
        ...,
        min_length=1,
        max_length=2000
    )


class AIReviewRequest(BaseModel):

    category: Category

    priority: Priority

    priority_reason: str = Field(
        ...,
        min_length=1,
        max_length=500
    )

    recommended_team_id: int | None = None


class AISuggestionResponse(BaseModel):

    id: int
    ticket_id: int
    summary: str
    category: Category
    priority: Priority
    priority_reason: str
    recommended_team: RecommendedTeam | None
    suggested_response: str
    status: str
    model_provider: str | None
    model_name: str | None
    created_at: datetime
    
class GlobalAISuggestionResponse(BaseModel):
    id: int
    ticket_id: int
    summary: str
    category: Category
    priority: Priority
    priority_reason: str

    recommended_team_id: int | None = None
    recommended_team: RecommendedTeam | None

    suggested_response: str
    status: str
    model_provider: str | None
    model_name: str | None
    created_at: datetime

    ticket_subject: str | None = None
    customer_name: str | None = None

    model_config = {
        "from_attributes": True
    }