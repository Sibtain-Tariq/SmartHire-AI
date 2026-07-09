from sqlalchemy import Column, String, DateTime
from app.database.base import Base
from app.models.mixins import UUIDMixin, TimestampMixin

class User(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "users"

    firebase_uid = Column(String(128), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    display_name = Column(String(255), nullable=True)
    photo_url = Column(String(1024), nullable=True)
    provider = Column(String(50), default="email")
    role = Column(String(50), default="user")
    
    last_login = Column(DateTime(timezone=True), nullable=True)
