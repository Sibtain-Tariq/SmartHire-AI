import io
from fpdf import FPDF
from app.services.resume_parser.pdf_parser import PDFParser, PDFParserError

def create_dummy_pdf(text: str, multi_page: bool = False) -> bytes:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=text, ln=1, align="L")
    if multi_page:
        pdf.add_page()
        pdf.cell(200, 10, txt="Page 2 text", ln=1, align="L")
    
    # Return as bytes
    return pdf.output(dest='S').encode('latin1')

def test_pdf_parser():
    parser = PDFParser()
    
    print("--- Test 1: Normal PDF ---")
    try:
        pdf_bytes = create_dummy_pdf("Hello World")
        text = parser.extract_text(pdf_bytes)
        print(f"Extracted: '{text}'")
        assert "Hello World" in text
        print("PASS")
    except Exception as e:
        print(f"FAIL: {e}")

    print("\n--- Test 2: Multi-page PDF ---")
    try:
        pdf_bytes = create_dummy_pdf("Page 1 text", multi_page=True)
        text = parser.extract_text(pdf_bytes)
        print(f"Extracted: '{text}'")
        assert "Page 1 text" in text
        assert "Page 2 text" in text
        print("PASS")
    except Exception as e:
        print(f"FAIL: {e}")

    print("\n--- Test 3: Invalid PDF ---")
    try:
        invalid_bytes = b"This is not a PDF file"
        parser.extract_text(invalid_bytes)
        print("FAIL: Should have thrown an error")
    except PDFParserError as e:
        print(f"PASS: Caught expected error -> {e}")

    print("\n--- Test 4: Scanned/Empty text PDF ---")
    try:
        # Create a PDF with no text
        pdf = FPDF()
        pdf.add_page()
        empty_bytes = pdf.output(dest='S').encode('latin1')
        parser.extract_text(empty_bytes)
        print("FAIL: Should have thrown an error")
    except PDFParserError as e:
        print(f"PASS: Caught expected error -> {e}")

if __name__ == "__main__":
    test_pdf_parser()
