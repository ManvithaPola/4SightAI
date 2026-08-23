from abc import ABC, abstractmethod

from app.schemas.ai import AIAnalysisResponse


class AIProvider(ABC):

    @abstractmethod
    def analyze_ticket(
        self,
        subject: str,
        description: str
    ) -> AIAnalysisResponse:
        pass

    @property
    @abstractmethod
    def provider_name(self) -> str:
        pass

    @property
    @abstractmethod
    def model_name(self) -> str:
        pass