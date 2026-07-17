import logging
from typing import Optional
from .schemas import ParsedResumeOutput
from .pdf_parser import PDFParser, PDFParserError
from .docx_parser import DocxParser, DocxParserError
from .text_cleaner import TextCleaner
from .section_extractor import SectionExtractor

logger = logging.getLogger(__name__)

class ResumeParserException(Exception):
    pass

class ResumeParserService:
    """
    Orchestrates the entire resume parsing pipeline.
    Connects extractors -> cleaners -> chunkers.
    """
    
    def __init__(self):
        self.pdf_parser = PDFParser()
        self.docx_parser = DocxParser()
        self.cleaner = TextCleaner()
        self.section_extractor = SectionExtractor()
        
    def parse(self, file_bytes: bytes, file_type: str) -> ParsedResumeOutput:
        """
        Main entry point for parsing a resume buffer.
        """
        if not file_bytes:
            raise ResumeParserException("Empty file buffer provided.")
            
        # 1. Extraction
        raw_text = ""
        metadata = {}
        
        # Normalize file_type
        ext = file_type.lower().replace('.', '')
        
        try:
            if ext == "pdf":
                raw_text = self.pdf_parser.extract_text(file_bytes)
                metadata = self.pdf_parser.extract_metadata(file_bytes)
            elif ext in ["doc", "docx"]:
                raw_text = self.docx_parser.extract_text(file_bytes)
                metadata = {"type": ext}
            else:
                raise ResumeParserException(f"Unsupported file format: {ext.upper()}. Please upload a PDF or Word Document.")
        except ResumeParserException:
            raise
        except (PDFParserError, DocxParserError) as e:
            logger.error(f"Extraction failed for {ext}: {str(e)}")
            raise ResumeParserException(f"Extraction failed: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected extraction error: {str(e)}")
            raise ResumeParserException("An unexpected error occurred while reading the file.")
            
        if not raw_text.strip():
            raise ResumeParserException("Empty resume: No readable text could be extracted from the document.")
            
        # 2. Cleaning
        cleaned_text = self.cleaner.clean(raw_text)
        
        if not cleaned_text.strip():
            raise ResumeParserException("Empty resume: Document contains no valid text after cleaning.")
        
        # 3. Section Extraction
        sections = self.section_extractor.extract_sections(cleaned_text)
        
        # 4. Return Structured Output
        return ParsedResumeOutput(
            raw_text=raw_text,
            cleaned_text=cleaned_text,
            sections=sections,
            metadata=metadata
        )
