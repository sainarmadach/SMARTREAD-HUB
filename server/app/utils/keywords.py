# from keybert import KeyBERT

# model = KeyBERT()

# def extract_keywords(text: str, num_keywords: int = 10):
#     keywords = model.extract_keywords(text, top_n=num_keywords)
#     return [kw for kw, score in keywords]


# app/utils/keywords.py

from keybert import KeyBERT

# Load the model once
kw_model = KeyBERT()

def extract_keywords(text: str, num_keywords: int = 8):
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english', top_n=num_keywords)
    return [kw[0] for kw in keywords]
