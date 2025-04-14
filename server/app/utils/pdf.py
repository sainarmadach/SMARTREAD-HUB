import io
from PyPDF2 import PdfReader

def extract_text_from_pdf(file_data: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(file_data))
        text = ""
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"
        return text.strip()
    except Exception as e:
        return f"⚠️ Failed to extract PDF text: {str(e)}"
