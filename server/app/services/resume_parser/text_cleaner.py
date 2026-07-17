import re

class TextCleaner:
    """
    Responsible for normalizing and cleaning extracted text.
    """
    
    @staticmethod
    def clean(raw_text: str) -> str:
        """
        Removes excessive whitespace, normalizes bullets, and cleans artifacts
        without destroying names, emails, dates, or company names.
        """
        if not raw_text or not isinstance(raw_text, str):
            return ""
            
        cleaned = raw_text

        # 1. Normalize bullet points and list artifacts
        # Matches common unicode bullets, dashes, squares, etc.
        bullet_pattern = re.compile(r'^[ \t]*[•·▪►➢✓✔✗-][ \t]+', re.MULTILINE)
        cleaned = bullet_pattern.sub('- ', cleaned)

        # 2. Remove non-printable / control characters (except standard newlines and tabs)
        # We keep ASCII printable, extended Latin, and common punctuation
        # This strips out invisible PDF artifacts like \x00, \x0c
        cleaned = re.sub(r'[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]', '', cleaned)

        # 3. Normalize horizontal whitespace
        # Replace multiple spaces or tabs with a single space (while preserving newlines)
        cleaned = re.sub(r'[ \t]{2,}', ' ', cleaned)

        # 4. Normalize vertical whitespace
        # Replace 3 or more consecutive newlines with a double newline
        cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

        # 5. Clean up leading/trailing whitespace on every line
        # This prevents hanging spaces that mess up NLP boundaries
        cleaned = '\n'.join([line.strip() for line in cleaned.splitlines()])

        # 6. Final normalization of completely blank lines that were stripped
        cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)

        return cleaned.strip()
