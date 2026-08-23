from app.ai.gemini_provider import GeminiProvider
from app.ai.grok_provider import GrokProvider
from app.ai.mock_provider import MockAIProvider
from app.ai.service import AIService
from app.core.config import settings


if settings.ai_provider.lower() == "gemini":

    provider = GeminiProvider()

elif settings.ai_provider.lower() == "grok":

    provider = GrokProvider()

else:

    provider = MockAIProvider()


ai_service = AIService(
    provider=provider
)