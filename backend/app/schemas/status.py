from pydantic import BaseModel, field_validator


ALLOWED_STATUSES = {
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "WAITING_FOR_CUSTOMER",
    "RESOLVED",
    "CLOSED",
}


class StatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str) -> str:
        if value not in ALLOWED_STATUSES:
            raise ValueError(
                f"Invalid status: {value}"
            )

        return value