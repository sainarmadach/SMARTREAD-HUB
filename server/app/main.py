from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import summarize
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize.router)

# 👇 This block is ONLY used if you run this file directly (like `python main.py`)
if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))  # Render provides this dynamically
    print(f"🚀 Starting server on port {port}...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
