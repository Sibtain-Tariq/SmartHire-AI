from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User

class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_firebase_uid(self, firebase_uid: str) -> User | None:
        query = select(User).where(User.firebase_uid == firebase_uid)
        result = await self.session.execute(query)
        return result.scalars().first()

    async def create(self, user: User) -> User:
        self.session.add(user)
        await self.session.flush()
        return user
