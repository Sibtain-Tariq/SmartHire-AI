import fitz  # PyMuPDF

class PDFParserError(Exception):
    pass

class PDFParser:
    """
    Responsible solely for extracting raw text from PDF binaries.
    """
    def __init__(self):
        pass
        
    def extract_text(self, file_bytes: bytes) -> str:
        """
        Extracts raw text from a PDF file buffer.
        """
        try:
            # Open PDF from memory buffer
            doc = fitz.open(stream=file_bytes, filetype="pdf")
        except Exception as e:
            raise PDFParserError(f"Invalid PDF: Could not open or read the file. ({str(e)})")
            
        if doc.page_count == 0:
            doc.close()
            raise PDFParserError("Empty document: The PDF has no pages.")
            
        extracted_text = []
        for page_num in range(doc.page_count):
            try:
                page = doc.load_page(page_num)
                text = page.get_text("text")
                if text:
                    extracted_text.append(text.strip())
            except Exception:
                # If a specific page fails, we try to recover text from other pages
                continue
                
        doc.close()
        
        final_text = "\n\n".join(filter(None, extracted_text)).strip()
        
        if not final_text:
            raise PDFParserError("Unable to extract text: The PDF might be an image-only scanned document or empty.")
            
        return final_text
        
    def extract_metadata(self, file_bytes: bytes) -> dict:
        """
        Extracts document metadata (page count, etc).
        """
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            metadata = doc.metadata or {}
            pages = doc.page_count
            doc.close()
            return {"type": "pdf", "pages": pages, "metadata": metadata}
        except Exception:
            return {"type": "pdf", "pages": 0, "metadata": {}}
