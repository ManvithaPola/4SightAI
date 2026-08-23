from google import genai
from google.genai import types

from app.ai.base import AIProvider
from app.ai.prompts import (
    SYSTEM_PROMPT,
    build_ticket_prompt
)
from app.core.config import settings
from app.schemas.ai import AIAnalysisResponse


class GeminiProvider(AIProvider):

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.gemini_api_key
        )
        
    @property
    def provider_name(self) -> str:
        return "gemini"


    @property
    def model_name(self) -> str:
        return settings.gemini_model

    def analyze_ticket(
        self,
        subject: str,
        description: str
    ) -> AIAnalysisResponse:

        prompt = f"""
{SYSTEM_PROMPT}

{build_ticket_prompt(
    subject,
    description
)}
"""

        response = self.client.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AIAnalysisResponse,
            ),
        )

        if not response.text:
            raise ValueError(
                "Gemini returned empty response"
            )

        return AIAnalysisResponse.model_validate_json(
            response.text
        )