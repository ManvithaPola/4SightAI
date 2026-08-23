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


class Ticket(Base):
    __tablename__ = "tickets"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    customer_email: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    subject: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    product_module: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    attachment_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    # Human-confirmed values
    category: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    priority: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    priority_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    assigned_team_id: Mapped[int | None] = mapped_column(
        ForeignKey("teams.id"),
        nullable=True
    )

    assigned_user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="OPEN",
        nullable=False
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )