from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base import Base
from app.models.mixins import UUIDMixin, TimestampMixin

class Resume(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "resumes"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String(255), nullable=True)
    original_filename = Column(String(512), nullable=False)
    storage_path = Column(String(1024), unique=True, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_type = Column(String(50), nullable=False)
    status = Column(String(50), default="pending", index=True, nullable=False)

    # Relationship back to the User model
    user = relationship("User", back_populates="resumes")
    
    # One-to-One relationship with the ATS Report
    ats_report = relationship("ATSReport", back_populates="resume", uselist=False, cascade="all, delete-orphan")

    # Relationship to Interview Sessions
    interview_sessions = relationship("InterviewSession", back_populates="resume")
