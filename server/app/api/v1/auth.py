from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter()

@router.get("/me", summary="Get authenticated user profile")
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Return the currently authenticated user's information extracted from the Firebase token.
    """
    return {
        "user_id": current_user.get("uid"),
        "email": current_user.get("email"),
        "email_verified": current_user.get("email_verified"),
        "name": current_user.get("name"),
        "picture": current_user.get("picture"),
        "auth_time": current_user.get("auth_time")
    }
