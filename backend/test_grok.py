from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.xai_api_key,
    base_url="https://api.x.ai/v1"
)


response = client.chat.completions.create(
    model=settings.grok_model,
    messages=[
        {
            "role": "user",
            "content": "Reply with exactly: Grok connection successful"
        }
    ]
)


print(response.choices[0].message.content)