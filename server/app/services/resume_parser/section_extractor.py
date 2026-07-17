import re
from typing import List
from .schemas import ResumeSection

class SectionExtractor:
    """
    Responsible for identifying and separating the cleaned text into logical resume sections
    using deterministic heuristics (no AI).
    """
    
    def __init__(self):
        # Map standardized section names to lists of regex patterns
        self.section_mapping = {
            "summary": [r"^summary$", r"^professional summary$", r"^objective$", r"^career objective$", r"^profile$", r"^about me$"],
            "experience": [r"^experience$", r"^work experience$", r"^professional experience$", r"^employment history$", r"^work history$"],
            "education": [r"^education$", r"^academic background$", r"^academic history$", r"^education and training$", r"^education & training$"],
            "skills": [r"^skills$", r"^technical skills$", r"^core competencies$", r"^skills & abilities$"],
            "projects": [r"^projects$", r"^personal projects$", r"^academic projects$", r"^selected projects$"],
            "certifications": [r"^certifications$", r"^licenses & certifications$", r"^certifications & training$", r"^certificates$"],
            "languages": [r"^languages$"]
        }
        
        # Compile all patterns for efficiency
        self.compiled_patterns = {}
        for standard_name, patterns in self.section_mapping.items():
            # Allow trailing colons and whitespace
            # Combine all variation patterns with an OR (|) operator
            combined = "|".join([f"({p})" for p in patterns])
            # E.g. ^((^summary$)|(^professional summary$))\s*:?\s*$
            # Since the sub-patterns have ^ and $, we need to strip them for the combined version
            stripped_patterns = [p.replace("^", "").replace("$", "") for p in patterns]
            combined_stripped = "|".join([f"({p})" for p in stripped_patterns])
            
            regex = re.compile(f"(?i)^({combined_stripped})\\s*:?\\s*$")
            self.compiled_patterns[standard_name] = regex

    def extract_sections(self, cleaned_text: str) -> List[ResumeSection]:
        """
        Identifies headers and chunks the text into distinct sections.
        Returns a list of ResumeSection objects.
        """
        if not cleaned_text:
            return []
            
        lines = cleaned_text.split("\n")
        
        sections = []
        current_section_name = "header" # Text before the first detected section (usually Name/Contact info)
        current_content = []
        
        for line in lines:
            line_stripped = line.strip()
            
            if not line_stripped:
                current_content.append(line)
                continue
                
            detected_section = None
            for standard_name, regex in self.compiled_patterns.items():
                if regex.match(line_stripped):
                    detected_section = standard_name
                    break
                    
            if detected_section:
                # Save previous section if it has actual content
                if current_content:
                    content_str = "\n".join(current_content).strip()
                    if content_str:
                        sections.append(ResumeSection(name=current_section_name, content=content_str))
                
                # Start new section
                current_section_name = detected_section
                current_content = []
            else:
                current_content.append(line)
                
        # Append the final hanging section
        if current_content:
            content_str = "\n".join(current_content).strip()
            if content_str:
                sections.append(ResumeSection(name=current_section_name, content=content_str))
                
        return sections
