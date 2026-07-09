from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from app.config.settings import settings

engine: AsyncEngine | None = None

DATABASE_URL = settings.get_database_url

if DATABASE_URL:
    engine = create_async_engine(
        DATABASE_URL,
        echo=(settings.ENVIRONMENT == 'development'),
        future=True,
        pool_pre_ping=True,
    )
