from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.config.settings import settings

DATABASE_URL = settings.get_database_url

engine: AsyncEngine | None = None
AsyncSessionLocal = None

if DATABASE_URL:
    engine = create_async_engine(
        DATABASE_URL,
        echo=(settings.ENVIRONMENT == 'development'),
        future=True,
        pool_pre_ping=True,
    )
    AsyncSessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
        autocommit=False,
    )


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    if AsyncSessionLocal is None:
        raise RuntimeError('Database is not configured. Set database connection variables to enable database sessions.')

    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
