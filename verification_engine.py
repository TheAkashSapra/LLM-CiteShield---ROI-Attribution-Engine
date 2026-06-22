import os
import requests
import json
from typing import Dict, Any, List
import time
from groq import Groq

def search_claim(claim: str) -> str:
    """Queries the Serper API with the given claim."""
    serper_api_key = os.getenv("SERPER_API_KEY")
    if not serper_api_key:
        return "Serper API key not configured."
        
    url = "https://google.serper.dev/search"
    payload = json.dumps({
      "q": claim
    })
    headers = {
      'X-API-KEY': serper_api_key,
      'Content-Type': 'application/json'
    }
    
    try:
        response = requests.request("POST", url, headers=headers, data=payload)
        response.raise_for_status()
        results = response.json()
        
        # Extract snippets and links for context
        context = ""
        if "organic" in results:
            for item in results["organic"][:5]: # Take top 5 results
                title = item.get("title", "")
                snippet = item.get("snippet", "")
                link = item.get("link", "")
                context += f"Title: {title}\nSnippet: {snippet}\nLink: {link}\n\n"
        return context
    except Exception as e:
        print(f"Error querying Serper API: {e}")
        return f"Error querying search: {e}"

def verify_claims_batch(claims_batch: List[Dict], target_brand: str = None) -> List[Dict]:
    """Uses Groq to verify a batch of claims in a single API call."""
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    brand_instruction = ""
    if target_brand:
        brand_instruction = f"""
        Additionally, identify if the brand '{target_brand}' is explicitly mentioned in the search context snippet.
        Also check if there is a clickable link (URL) pointing to '{target_brand}' or its associated domains.
        """

    prompt = f"""
    You are an expert fact-checker. Evaluate the following list of claims based ONLY on their provided search context.
    
    Task:
    1. Determine the status of each claim. It must be exactly one of: "Verified", "Inaccurate", or "False".
    2. Provide a brief explanation for your status.
    {brand_instruction}
    
    Claims to Verify:
    """
    
    for i, claim_data in enumerate(claims_batch):
        prompt += f"\n--- Claim {i+1} ---\n"
        prompt += f"Text: {claim_data['claim']}\n"
        prompt += f"Search Context:\n{claim_data['context']}\n"
        
    prompt += """
    Output your response STRICTLY as a JSON object containing a single key "results", which must be an array of objects in the exact same order as the claims provided.
    
    Example format:
    {
        "results": [
            {
                "claim": "The original claim text",
                "status": "Verified | Inaccurate | False",
                "explanation": "Brief explanation",
                "brand_mentioned": true or false,
                "brand_linked": true or false,
                "cited_urls": ["url1", "url2"]
            }
        ]
    }
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        results = data.get("results", [])
        
        # Ensure brand keys exist if brand was not targeted
        for result in results:
            if target_brand is None:
                result.setdefault("brand_mentioned", False)
                result.setdefault("brand_linked", False)
            
        return results
    except Exception as e:
        print(f"Error parsing verification JSON from Groq: {e}")
        return []
