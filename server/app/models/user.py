import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.database.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    firebase_uid = Column(String(128), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    display_name = Column(String(255), nullable=True)
    photo_url = Column(String(1024), nullable=True)
    provider = Column(String(50), default="email")
    role = Column(String(50), default="user")
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    last_login = Column(DateTime(timezone=True), nullable=True)
