import io
import docx
from docx.document import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

class DocxParserError(Exception):
    pass

class DocxParser:
    """
    Responsible solely for extracting raw text from DOCX binaries.
    """
    def __init__(self):
        pass
        
    def _extract_text_from_element(self, element) -> str:
        if isinstance(element, Paragraph):
            return element.text.strip()
        elif isinstance(element, Table):
            table_text = []
            for row in element.rows:
                row_text = []
                for cell in row.cells:
                    cell_text = cell.text.strip()
                    if cell_text:
                        row_text.append(cell_text)
                if row_text:
                    table_text.append(" | ".join(row_text))
            return "\n".join(table_text)
        return ""

    def extract_text(self, file_bytes: bytes) -> str:
        """
        Extracts raw text from a DOCX file buffer.
        """
        try:
            # Load DOCX from memory buffer
            doc = docx.Document(io.BytesIO(file_bytes))
        except Exception as e:
            raise DocxParserError(f"Invalid DOCX: Could not open or read the file. ({str(e)})")
            
        extracted_blocks = []
        
        # Iterate over all block-level elements (paragraphs and tables)
        for element in doc.element.body:
            if element.tag.endswith('p'):
                # Paragraph
                para = Paragraph(element, doc)
                text = self._extract_text_from_element(para)
                if text:
                    extracted_blocks.append(text)
            elif element.tag.endswith('tbl'):
                # Table
                table = Table(element, doc)
                text = self._extract_text_from_element(table)
                if text:
                    extracted_blocks.append(text)

        final_text = "\n\n".join(filter(None, extracted_blocks)).strip()
        
        if not final_text:
            raise DocxParserError("Empty document: The DOCX has no readable text.")
            
        return final_text
