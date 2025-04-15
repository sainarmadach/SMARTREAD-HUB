from fastapi import APIRouter, UploadFile, File, Form
from app.models.summary_model import SummaryResponse, TextInput, URLPayload
from app.services.summarizer import summarize_text  # This is an async function
from app.utils.keywords import extract_keywords
from app.utils.cleaner import html_to_text
from app.utils.scraper import fetch_url_content
from app.utils.pdf import extract_text_from_pdf

router = APIRouter()

# Endpoint for file upload summarization
@router.post("/summarize", response_model=SummaryResponse)
async def summarize_book(
    file: UploadFile = File(...),
    mode: str = Form("full"),
    length: str = Form("medium"),
    language: str = Form("en")
):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)  # Ensure extract_text_from_pdf is defined in your utils/pdf.py
    text = text[:5000]  # Limit input for performance
    
    # Await the asynchronous summarization function
    summary = await summarize_text(text, mode, length, language)
    keywords = extract_keywords(text[:1000])
    
    return SummaryResponse(summary=summary, keywords=keywords)

# Endpoint for summarizing pasted text
@router.post("/summarize-text", response_model=SummaryResponse)
async def summarize_from_text(payload: TextInput):
    try:
        # Limit the text to 5000 characters if needed
        text = payload.text[:5000]
        # Await the asynchronous summarization function
        summary = await summarize_text(text, payload.mode, payload.length, payload.language)
        keywords = extract_keywords(text[:1000])
        return SummaryResponse(summary=summary, keywords=keywords)
    except Exception as e:
        print("❌ Text summarization error:", str(e))
        return SummaryResponse(summary=f"⚠️ Error: {str(e)}", keywords=[])

# Endpoint for summarizing content from a URL
@router.post("/summarize-url", response_model=SummaryResponse)
async def summarize_from_url(payload: URLPayload):
    try:
        print(f"🔗 Requested URL: {payload.url}")
        raw_html = fetch_url_content(payload.url)
        content = html_to_text(raw_html)
        print(f"🧾 Extracted text (first 500 chars): {content[:500]}")
        content = content[:5000]
        summary = await summarize_text(content, payload.mode, payload.length, payload.language)
        keywords = extract_keywords(content[:1000])
        return SummaryResponse(summary=summary, keywords=keywords)
    except Exception as e:
        print("❌ URL summarization error:", str(e))
        return SummaryResponse(summary=f"⚠️ Error: {str(e)}", keywords=[])
