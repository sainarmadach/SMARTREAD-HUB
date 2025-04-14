from pydantic import BaseModel
from typing import List

class URLPayload(BaseModel):
    url: str
    mode: str
    length: str
    language: str

class SummaryResponse(BaseModel):
    summary: str
    keywords: List[str]
