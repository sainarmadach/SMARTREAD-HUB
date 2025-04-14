
from fastapi import APIRouter, UploadFile, File, Form
from app.utils.pdf import extract_text_from_pdf
from app.utils.keywords import extract_keywords
from app.utils.cleaner import html_to_text
from app.models.summary_model import SummaryResponse, URLPayload
from app.services.summarizer import summarize_text
from readability import Document
import requests
from app.utils.scraper import fetch_url_content
from fastapi import Body




router = APIRouter()

# 🔹 File Upload Summarization
# @router.post("/summarize", response_model=SummaryResponse)
# async def summarize_book(
#     file: UploadFile = File(...),
#     mode: str = Form("full"),
#     length: str = Form("medium"),
#     language: str = Form("en")
# ):
#     pdf_bytes = await file.read()
#     text = extract_text_from_pdf(pdf_bytes)
#     text = text[:5000]  # limit input size for performance

#     summary = summarize_text(text, mode, length, language)
#     keywords = extract_keywords(text[:1000])
#     return SummaryResponse(summary=summary, keywords=keywords)
@router.post("/summarize", response_model=SummaryResponse)
async def summarize_book(
    file: UploadFile = File(...),
    mode: str = Form("full"),
    length: str = Form("medium"),
    language: str = Form("en")
):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)
    text = text[:5000]  # Limit input for performance
    
    # Await the asynchronous summarization function
    summary = await summarize_text(text, mode, length, language)
    keywords = extract_keywords(text[:1000])
    
    return SummaryResponse(summary=summary, keywords=keywords)



@router.post("/summarize-url", response_model=SummaryResponse)
def summarize_from_url(payload: URLPayload):
    try:
        print(f"🔗 Requested URL: {payload.url}")
        raw_html = fetch_url_content(payload.url)
        content = html_to_text(raw_html)

        content = content[:5000]
        summary = summarize_text(content, payload.mode, payload.length, payload.language)
        keywords = extract_keywords(content[:1000])

        return SummaryResponse(summary=summary, keywords=keywords)

    except Exception as e:
        print("❌ URL summarization error:", str(e))
        return SummaryResponse(summary=f"⚠️ Error: {str(e)}", keywords=[])


@router.post("/summarize-text", response_model=SummaryResponse)
def summarize_from_text(
    text: str = Body(...),
    mode: str = Body("full"),
    length: str = Body("medium"),
    language: str = Body("en")
):
    try:
        print(f"📝 Text length received: {len(text)} characters")
        content = text[:5000]  # Limit text size for processing

        summary = summarize_text(content, mode, length, language)
        keywords = extract_keywords(content[:1000])

        return SummaryResponse(summary=summary, keywords=keywords)

    except Exception as e:
        print("❌ Text summarization error:", str(e))
        return SummaryResponse(summary=f"⚠️ Error: {str(e)}", keywords=[])



