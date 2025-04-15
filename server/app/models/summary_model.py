from pydantic import BaseModel
from typing import List

class TextInput(BaseModel):
    text: str
    mode: str = "full"
    length: str = "medium"
    language: str = "en"

class URLPayload(BaseModel):
    url: str
    mode: str = "full"
    length: str = "medium"
    language: str = "en"

class SummaryResponse(BaseModel):
    summary: str
    keywords: List[str]
