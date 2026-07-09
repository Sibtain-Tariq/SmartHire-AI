from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database.base import Base
from app.models.mixins import UUIDMixin, TimestampMixin

class InterviewSession(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "interview_sessions"

    # Core Foreign Key Links
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    resume_id = Column(UUID(as_uuid=True), ForeignKey("resumes.id", ondelete="SET NULL"), index=True, nullable=True)
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="SET NULL"), index=True, nullable=True)

    # Conversation state (stores the full array of AI/User message history)
    conversation = Column(JSONB, nullable=False, default=list)

    # Status tracking (e.g., pending, in_progress, completed, abandoned)
    status = Column(String(50), default="pending", index=True, nullable=False)

    # Explicit lifecycle timestamps for the actual interview event
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships back to core models
    user = relationship("User", back_populates="interview_sessions")
    resume = relationship("Resume", back_populates="interview_sessions")
    job = relationship("Job", back_populates="interview_sessions")
