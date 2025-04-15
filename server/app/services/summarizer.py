import asyncio
from transformers import pipeline
import torch

# Select device
device = 0 if torch.cuda.is_available() else -1

# Load summarization model
summarizer_model = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=device
)

# Async function to summarize a chunk of text
async def summarize_chunk(chunk: str, min_length: int, max_length: int) -> str:
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(
        None,
        lambda: summarizer_model(chunk, min_length=min_length, max_length=max_length, do_sample=False)
    )
    return result[0]['summary_text']

# Main async summarization function
async def summarize_text(text: str, mode: str, length: str, language: str) -> str:
    # Adjust length based on user choice
    if length == "short":
        min_len, max_len = 30, 80
    elif length == "medium":
        min_len, max_len = 60, 150
    elif length == "detailed":
        min_len, max_len = 100, 300
    else:
        min_len, max_len = 60, 150

    # Chunk the text for long content
    chunk_size = 1500
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    # Process all chunks concurrently
    summaries = await asyncio.gather(
        *(summarize_chunk(chunk, min_len, max_len) for chunk in chunks)
    )

    # Merge all chunk summaries
    summary = " ".join(summaries)

    # ✅ Bullet point formatting
    if mode == "bullet":
        summary = "• " + summary.replace('. ', '.\n• ')

    return summary
