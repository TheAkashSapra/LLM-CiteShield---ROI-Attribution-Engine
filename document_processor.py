import pypdf
import json
import os
from typing import List, Dict
from groq import Groq

def extract_text_from_pdf(file) -> str:
    """Extracts raw text from an uploaded PDF file."""
    pdf_reader = pypdf.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    return text

def parse_claims_from_text(text: str) -> List[Dict]:
    """Uses Groq to parse the extracted text into an isolated array of claims."""
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    prompt = f"""
    Analyze the following text extracted from a document. 
    Your task is to identify and extract all distinct, verifiable claims, facts, or statements made in the text.
    
    Return the result STRICTLY as a JSON object.
    The JSON object must have a single key "claims" containing an array of objects.
    Each object should have a single key "claim" with the string value of the claim.
    
    Example format:
    {{
        "claims": [
            {{"claim": "The company's revenue grew by 20% in Q3."}},
            {{"claim": "The new product reduces energy consumption by half."}}
        ]
    }}
    
    Text to analyze:
    {text}
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        claims_data = json.loads(content)
        return claims_data.get("claims", [])
    except Exception as e:
        print(f"Error parsing JSON from Groq: {e}")
        return []

def chat_with_document(document_text: str, chat_history: List[Dict]) -> str:
    """Uses Groq to answer user questions based on the extracted document text."""
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    system_prompt = f"""You are CiteShield AI, an intelligent assistant helping a user analyze a document.
You must answer the user's questions based strictly on the following document context.
If the answer is not contained in the document, tell the user that the information is not present.

DOCUMENT CONTEXT:
================
{document_text}
================
"""
    
    api_messages = [{"role": "system", "content": system_prompt}]
    
    for msg in chat_history[-10:]:
        # Filter out massive UI-injected analysis results to save context window tokens
        if msg["role"] == "assistant" and "Citation Share of Voice" in msg["content"]:
            continue
        api_messages.append({"role": msg["role"], "content": msg["content"]})
        
    try:
        chat_completion = client.chat.completions.create(
            messages=api_messages,
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error communicating with AI: {str(e)}"
