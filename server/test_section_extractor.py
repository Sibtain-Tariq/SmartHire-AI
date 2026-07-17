from app.services.resume_parser.section_extractor import SectionExtractor

def test_section_extractor():
    extractor = SectionExtractor()
    
    print("--- Test 1: Standard Sections ---")
    resume_text = """John Doe
john.doe@email.com

PROFESSIONAL SUMMARY
Passionate software engineer.

WORK EXPERIENCE:
Company A
- Did things

ACADEMIC BACKGROUND
MIT

TECHNICAL SKILLS
- Python
- React"""

    sections = extractor.extract_sections(resume_text)
    
    print("Extracted Blocks:")
    for sec in sections:
        print(f"[{sec.name.upper()}]\n{sec.content}\n")
        
    assert len(sections) == 5
    assert sections[0].name == "header"
    assert "john.doe" in sections[0].content
    
    assert sections[1].name == "summary"
    assert "Passionate software engineer." in sections[1].content
    
    assert sections[2].name == "experience"
    assert "Company A" in sections[2].content
    
    assert sections[3].name == "education"
    assert "MIT" in sections[3].content
    
    assert sections[4].name == "skills"
    assert "- Python" in sections[4].content
    print("PASS")

    print("\n--- Test 2: No Sections Detected ---")
    bad_text = "I am a guy who works at places and knows python."
    sections = extractor.extract_sections(bad_text)
    assert len(sections) == 1
    assert sections[0].name == "header"
    print("PASS")
    
    print("\n--- Test 3: Empty Text ---")
    sections = extractor.extract_sections("")
    assert len(sections) == 0
    print("PASS")

if __name__ == "__main__":
    test_section_extractor()
