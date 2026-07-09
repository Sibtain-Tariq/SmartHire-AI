from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database.base import Base
from app.models.mixins import UUIDMixin, TimestampMixin

class Job(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "jobs"

    # Link back to the user who created the job posting
    user_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("users.id", ondelete="CASCADE"), 
        index=True, 
        nullable=False
    )
    
    # Core Job Details
    title = Column(String(255), index=True, nullable=False)
    company = Column(String(255), index=True, nullable=False)
    description = Column(Text, nullable=False)
    
    # Store complex lists of job requirements as a flexible JSONB array
    requirements = Column(JSONB, nullable=False, default=list)
    
    # Job tracking status (e.g., 'draft', 'open', 'closed')
    status = Column(String(50), default="open", index=True, nullable=False)

    # Relationship back to User
    user = relationship("User", back_populates="jobs")
