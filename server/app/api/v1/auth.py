from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_current_user, get_db_session
from app.services.user_service import UserService

router = APIRouter()

@router.get("/me", summary="Get authenticated user profile")
async def get_me(
    current_token: dict = Depends(get_current_user),
    session: AsyncSession = Depends(get_db_session)
):
    """
    Return the currently authenticated user's information.
    Synchronizes the Firebase token with the local PostgreSQL database.
    """
    user_service = UserService(session)
    try:
        user = await user_service.sync_firebase_user(current_token)
        await session.commit()
        await session.refresh(user)
        
        return {
            "id": str(user.id),
            "firebase_uid": user.firebase_uid,
            "email": user.email,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
            "role": user.role,
            "created_at": user.created_at,
            "last_login": user.last_login
        }
    except Exception as e:
        await session.rollback()
        raise e
