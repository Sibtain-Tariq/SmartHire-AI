from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ResumeSection(BaseModel):
    name: str = Field(description="The categorized name of the section (e.g., 'experience', 'education')")
    content: str = Field(description="The raw text content belonging to this section")
    
class ParsedResumeOutput(BaseModel):
    raw_text: str = Field(description="The raw extracted text directly from the document binary")
    cleaned_text: str = Field(description="The normalized and cleaned text ready for NLP processing")
    sections: List[ResumeSection] = Field(default_factory=list, description="Extracted distinct sections")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="File metadata like page count, source type, and extraction metrics")
