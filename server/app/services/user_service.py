from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.user_repository import UserRepository
from app.models.user import User
import logging

logger = logging.getLogger(__name__)

class UserService:
    def __init__(self, session: AsyncSession):
        self.repository = UserRepository(session)

    async def sync_firebase_user(self, firebase_token: dict) -> User:
        """
        Synchronizes a Firebase user with the PostgreSQL database.
        If user exists, updates their last_login and profile info.
        If user does not exist, creates a new record.
        """
        firebase_uid = firebase_token.get("uid")
        email = firebase_token.get("email")
        
        if not firebase_uid or not email:
            raise ValueError("Firebase token is missing required UID or email fields.")

        user = await self.repository.get_by_firebase_uid(firebase_uid)
        
        display_name = firebase_token.get("name", "")
        photo_url = firebase_token.get("picture", "")
        provider = firebase_token.get("firebase", {}).get("sign_in_provider", "email")

        if user:
            # Update existing user
            user.last_login = datetime.now(timezone.utc)
            if display_name and user.display_name != display_name:
                user.display_name = display_name
            if photo_url and user.photo_url != photo_url:
                user.photo_url = photo_url
        else:
            # Create new user
            user = User(
                firebase_uid=firebase_uid,
                email=email,
                display_name=display_name,
                photo_url=photo_url,
                provider=provider,
                last_login=datetime.now(timezone.utc)
            )
            await self.repository.create(user)

        return user
