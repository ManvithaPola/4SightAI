from google import genai
from google.genai import types

from app.core.config import settings
from app.schemas.ai import AIAnalysisResponse


client = genai.Client(
    api_key=settings.gemini_api_key
)


prompt = """
Analyze this customer support ticket.

Subject:
Production users cannot log in

Description:
All production users are receiving an authentication
error after the latest deployment.

Return the required structured ticket analysis.
"""


response = client.models.generate_content(
    model=settings.gemini_model,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=AIAnalysisResponse,
    ),
)


print("RAW RESPONSE:")
print(response.text)


result = AIAnalysisResponse.model_validate_json(
    response.text
)

print("\nVALIDATED RESULT:")
print(result)