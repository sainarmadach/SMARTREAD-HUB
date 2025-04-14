# 📁 Location: server/venv/app/utils/scraper.py

import requests
from readability import Document

def fetch_url_content(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    doc = Document(response.text)
    return doc.summary()
