ALLOWED_TRANSITIONS = {
    "OPEN": {
        "ASSIGNED",
    },

    "ASSIGNED": {
        "IN_PROGRESS",
    },

    "IN_PROGRESS": {
        "WAITING_FOR_CUSTOMER",
        "RESOLVED",
    },

    "WAITING_FOR_CUSTOMER": {
        "IN_PROGRESS",
    },

    "RESOLVED": {
        "CLOSED",
        "OPEN",
    },

    "CLOSED": {
        "OPEN",
    },
}


def is_valid_transition(
    current_status: str,
    new_status: str
) -> bool:

    allowed = ALLOWED_TRANSITIONS.get(
        current_status,
        set()
    )

    return new_status in allowed