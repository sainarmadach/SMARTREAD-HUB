import asyncio
from transformers import pipeline

# Initialize the summarization pipeline once
summarizer_model = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

# Asynchronous helper: Summarize one chunk of text
async def summarize_chunk(chunk: str, min_length: int, max_length: int) -> str:
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(
        None,
        lambda: summarizer_model(chunk, min_length=min_length, max_length=max_length, do_sample=False)
    )
    return result[0]['summary_text']

# Asynchronous function to summarize a large text by splitting it into chunks
async def summarize_text_async(text: str, mode: str, length: str, language: str) -> str:
    # Define length parameters based on selection
    if length == "short":
        min_len, max_len = 30, 80
    elif length == "medium":
        min_len, max_len = 60, 150
    elif length == "detailed":
        min_len, max_len = 100, 300
    else:
        min_len, max_len = 60, 150

    # Break text into manageable chunks (here, 1000 characters each)
    chunk_size = 1000
    chunks = [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]
    
    # Process all chunks concurrently
    summaries = await asyncio.gather(*(summarize_chunk(chunk, min_len, max_len) for chunk in chunks))
    
    # Combine summaries into a final summary
    final_summary = " ".join(summaries)
    return final_summary

# Make the summarization function async (this is the one you'll await in your endpoint)
async def summarize_text(text: str, mode: str, length: str, language: str) -> str:
    return await summarize_text_async(text, mode, length, language)
