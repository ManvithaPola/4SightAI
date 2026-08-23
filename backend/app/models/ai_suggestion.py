from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text
)
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AISuggestion(Base):
    __tablename__ = "ai_suggestions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    ticket_id: Mapped[int] = mapped_column(
        ForeignKey("tickets.id"),
        nullable=False,
        index=True
    )

    summary: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    priority_reason: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    recommended_team_id: Mapped[int | None] = mapped_column(
        ForeignKey("teams.id"),
        nullable=True
    )

    suggested_response: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="PENDING",
        nullable=False
    )

    model_provider: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    model_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )