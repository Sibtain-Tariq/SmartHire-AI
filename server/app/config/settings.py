from pathlib import Path
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=[str(path) for path in [Path(__file__).resolve().parents[2] / '.env'] if path.exists()],
        env_file_encoding='utf-8',
        extra='ignore',
    )

    ENVIRONMENT: str = Field(default='development')
    APP_DEBUG: bool = Field(default=True)
    APP_HOST: str = Field(default='0.0.0.0')
    APP_PORT: int = Field(default=8000)
    SECRET_KEY: str = Field(default='super-secret-key-for-dev-only')

    DATABASE_HOST: str = Field(default='localhost')
    DATABASE_PORT: int = Field(default=5432)
    DATABASE_NAME: str = Field(default='postgres')
    DATABASE_USER: str = Field(default='postgres')
    DATABASE_PASSWORD: str = Field(default='')
    DATABASE_URL: str | None = Field(default=None)

    @property
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql+asyncpg://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    FIREBASE_CREDENTIALS_PATH: str = Field(default='')

    ALLOWED_ORIGINS: str = Field(default='http://localhost:5173')

    @property
    def allowed_origins(self) -> List[str]:
        value = (self.ALLOWED_ORIGINS or '').strip()
        if not value:
            return ['http://localhost:5173']
        return [item.strip() for item in value.split(',') if item.strip()]

    CHROMA_DB_DIR: str = Field(default='./chroma_db')
    GROQ_API_KEY: str = Field(default='')

    LOG_LEVEL: str = Field(default='INFO')


settings = Settings()
