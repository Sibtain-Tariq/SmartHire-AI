from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database.base import Base
from app.models.mixins import UUIDMixin, TimestampMixin

class ATSReport(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "ats_reports"

    # A single resume maps to a single ATS report
    resume_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("resumes.id", ondelete="CASCADE"), 
        unique=True, 
        index=True, 
        nullable=False
    )
    
    # Granular scoring metrics (typically 0-100)
    overall_score = Column(Integer, index=True, nullable=False)
    keyword_score = Column(Integer, nullable=False)
    formatting_score = Column(Integer, nullable=False)
    skill_score = Column(Integer, nullable=False)
    experience_score = Column(Integer, nullable=False)
    
    # Unstructured AI analysis data stored efficiently as JSONB
    suggestions = Column(JSONB, nullable=False, default=list)
    analysis_metadata = Column(JSONB, nullable=False, default=dict)

    # Relationship back to the Resume model
    resume = relationship("Resume", back_populates="ats_report")
