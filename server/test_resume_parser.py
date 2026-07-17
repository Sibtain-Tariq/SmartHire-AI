from app.services.resume_parser.resume_parser import ResumeParserService, ResumeParserException

# Reuse the dummy generators
from test_pdf_parser import create_dummy_pdf
from test_docx_parser import create_dummy_docx

def test_resume_parser():
    service = ResumeParserService()
    
    print("--- Test 1: Full PDF Pipeline ---")
    try:
        pdf_bytes = create_dummy_pdf("John Doe\n\nPROFESSIONAL EXPERIENCE\nSoftware Engineer")
        result = service.parse(pdf_bytes, "pdf")
        assert "John Doe" in result.raw_text
        assert "Software Engineer" in result.cleaned_text
        # sections: header -> John Doe, experience -> Software Engineer
        assert any(s.name == "experience" for s in result.sections)
        print("PASS")
    except Exception as e:
        print(f"FAIL: {e}")

    print("\n--- Test 2: Full DOCX Pipeline ---")
    try:
        docx_bytes = create_dummy_docx(has_table=True)
        result = service.parse(docx_bytes, "docx")
        assert "John Doe" in result.raw_text
        assert any(s.name == "header" for s in result.sections)
        print("PASS")
    except Exception as e:
        print(f"FAIL: {e}")

    print("\n--- Test 3: Unsupported File Type ---")
    try:
        service.parse(b"fake data", "txt")
        print("FAIL: Should have thrown an error")
    except ResumeParserException as e:
        print(f"PASS: Caught expected error -> {e}")

    print("\n--- Test 4: Empty Buffer ---")
    try:
        service.parse(b"", "pdf")
        print("FAIL: Should have thrown an error")
    except ResumeParserException as e:
        print(f"PASS: Caught expected error -> {e}")

    print("\n--- Test 5: Corrupt PDF Pipeline ---")
    try:
        service.parse(b"corrupt binary data", "pdf")
        print("FAIL: Should have thrown an error")
    except ResumeParserException as e:
        print(f"PASS: Caught expected error -> {e}")

if __name__ == "__main__":
    test_resume_parser()
