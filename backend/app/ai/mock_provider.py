from app.ai.base import AIProvider
from app.schemas.ai import AIAnalysisResponse


class MockAIProvider(AIProvider):
    @property
    def provider_name(self) -> str:
        return "mock"


    @property
    def model_name(self) -> str:
        return "mock-provider"

    def analyze_ticket(
        self,
        subject: str,
        description: str
    ) -> AIAnalysisResponse:

        return AIAnalysisResponse(
            summary=(
                "Production users are unable to log in "
                "following a recent deployment."
            ),
            category="Authentication",
            priority="Critical",
            priority_reason=(
                "All production users are affected "
                "and business operations are blocked."
            ),
            recommended_team="Platform Engineering",
            suggested_response=(
                "Thank you for reporting this issue. "
                "We understand that production users are "
                "currently unable to log in. Our team is "
                "reviewing the issue and will provide an "
                "update as more information becomes available."
            )
        )