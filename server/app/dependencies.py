from typing import AsyncGenerator
from app.database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Request, HTTPException, status

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async for session in get_db():
        yield session

def get_current_user(request: Request) -> dict:
    """
    Dependency to enforce that a user is authenticated.
    Reads the user from request.state.user populated by FirebaseAuthMiddleware.
    """
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided or are invalid."
        )
    return user
