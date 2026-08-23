from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    app_name: str = "4Sight AI Support Ticket System"

    database_url: str = "sqlite:///./4sight.db"

    secret_key: str = "change-this-development-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # AI
    ai_provider: str = "mock"

    gemini_api_key: str = ""

    gemini_model: str = "gemini-3.6-flash"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()