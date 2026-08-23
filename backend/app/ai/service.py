from app.ai.base import AIProvider
from app.schemas.ai import AIAnalysisResponse


class AIService:

    def __init__(self, provider: AIProvider):
        self.provider = provider

    def analyze_ticket(
        self,
        subject: str,
        description: str
    ) -> AIAnalysisResponse:

        return self.provider.analyze_ticket(
            subject=subject,
            description=description
        )

    @property
    def provider_name(self) -> str:
        return self.provider.provider_name

    @property
    def model_name(self) -> str:
        return self.provider.model_name