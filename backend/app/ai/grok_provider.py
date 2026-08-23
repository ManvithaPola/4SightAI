from openai import OpenAI

from app.ai.base import AIProvider
from app.ai.prompts import (
    SYSTEM_PROMPT,
    build_ticket_prompt
)
from app.core.config import settings
from app.schemas.ai import AIAnalysisResponse


class GrokProvider(AIProvider):

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.xai_api_key,
            base_url="https://api.x.ai/v1"
        )
    
    @property
    def provider_name(self) -> str:
        return "grok"


    @property
    def model_name(self) -> str:
        return settings.grok_model

    def analyze_ticket(
        self,
        subject: str,
        description: str
    ) -> AIAnalysisResponse:

        response = self.client.chat.completions.parse(
            model=settings.grok_model,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": build_ticket_prompt(
                        subject,
                        description
                    )
                }
            ],
            response_format=AIAnalysisResponse
        )

        parsed = response.choices[0].message.parsed

        if parsed is None:
            raise ValueError(
                "Grok returned no structured output"
            )

        return parsed