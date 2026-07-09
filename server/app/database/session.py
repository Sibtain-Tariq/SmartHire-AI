from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from app.database.database import engine

AsyncSessionLocal = None

if engine:
    AsyncSessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
        autocommit=False,
    )

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Creates and yields a new database session.
    Ensures the session is safely closed after use.
    """
    if AsyncSessionLocal is None:
        raise RuntimeError('Database is not configured. Set database connection variables to enable database sessions.')

    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
