import pytest
from pydantic import ValidationError

from app.schemas.ai import AIAnalysisResponse


def test_valid_ai_response():

    result = AIAnalysisResponse(
        summary="Users cannot log in after deployment.",
        category="Authentication",
        priority="Critical",
        priority_reason="All production users are affected.",
        recommended_team="Platform Engineering",
        suggested_response="Thank you for reporting this issue."
    )

    assert result.category == "Authentication"
    assert result.priority == "Critical"


def test_invalid_category():

    with pytest.raises(ValidationError):

        AIAnalysisResponse(
            summary="Users cannot log in.",
            category="Random Category",
            priority="Critical",
            priority_reason="All users are affected.",
            recommended_team="Platform Engineering",
            suggested_response="Thank you for reporting this issue."
        )


def test_invalid_priority():

    with pytest.raises(ValidationError):

        AIAnalysisResponse(
            summary="Users cannot log in.",
            category="Authentication",
            priority="Extreme",
            priority_reason="All users are affected.",
            recommended_team="Platform Engineering",
            suggested_response="Thank you for reporting this issue."
        )