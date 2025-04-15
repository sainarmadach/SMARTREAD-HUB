from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import summarize

app = FastAPI(
    title="SmartRead Hub API",
    description="Summarize text, PDF, or URLs into clean, smart summaries.",
    version="1.0.0"
)

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(summarize.router)
