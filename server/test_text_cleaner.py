from app.services.resume_parser.text_cleaner import TextCleaner

def test_text_cleaner():
    cleaner = TextCleaner()
    
    print("--- Test 1: Normal Resume Text ---")
    normal_text = "John Doe\n\nSoftware Engineer\njohn.doe@email.com\n\n- Python\n- React"
    cleaned = cleaner.clean(normal_text)
    assert "John Doe" in cleaned
    assert "john.doe@email.com" in cleaned
    assert "- Python" in cleaned
    print("PASS")
    
    print("\n--- Test 2: Messy PDF Extraction ---")
    # Simulates bad PDF encodings: weird bullets, massive spaces, control characters, hanging indents
    messy_text = "Jane Smith \t \t \n\n\n\n  \x0c  Data Scientist   \n\n • \t Machine Learning \n ▪ \t SQL \n ► Python   "
    cleaned = cleaner.clean(messy_text)
    assert "Jane Smith" in cleaned
    assert "- Machine Learning" in cleaned
    assert "- SQL" in cleaned
    assert "- Python" in cleaned
    assert "\x0c" not in cleaned
    assert "   " not in cleaned # No triple spaces
    assert "\n\n\n" not in cleaned # No triple newlines
    print("PASS")
    
    print("\n--- Test 3: Empty/None Text ---")
    assert cleaner.clean("") == ""
    assert cleaner.clean(None) == ""
    print("PASS")
    
if __name__ == "__main__":
    test_text_cleaner()
