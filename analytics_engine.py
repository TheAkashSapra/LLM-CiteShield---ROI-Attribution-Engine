import requests
from bs4 import BeautifulSoup
import json
from typing import List, Dict, Any

def calculate_csov(results: List[Dict[str, Any]]) -> float:
    """
    Calculate Citation Share of Voice (cSoV).
    Formula: (Number of Responses with Clickable Brand Links / Total Number of Brand Mention Responses) * 100
    """
    brand_mention_responses = 0
    clickable_brand_links = 0
    
    for res in results:
        if res.get("brand_mentioned"):
            brand_mention_responses += 1
            if res.get("brand_linked"):
                clickable_brand_links += 1
                
    if brand_mention_responses == 0:
        return 0.0
        
    csov = (clickable_brand_links / brand_mention_responses) * 100
    return round(csov, 2)

def extract_schema_data(url: str) -> Dict[str, Any]:
    """Extracts JSON-LD schema from a given URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        schemas = soup.find_all('script', type='application/ld+json')
        
        extracted_schemas = []
        for schema in schemas:
            try:
                data = json.loads(schema.string)
                extracted_schemas.append(data)
            except json.JSONDecodeError:
                pass
        return {"url": url, "schemas": extracted_schemas}
    except Exception as e:
        print(f"Failed to extract schema from {url}: {e}")
        return {"url": url, "schemas": [], "error": str(e)}

def recommend_schema_optimizations(cited_urls: List[str]) -> List[Dict[str, Any]]:
    """Recommends schema optimizations based on pages that successfully got cited."""
    recommendations = []
    
    for url in cited_urls:
        schema_info = extract_schema_data(url)
        if schema_info["schemas"]:
            rec = {
                "url": url,
                "insight": "This page was cited and contains JSON-LD schema.",
                "schemas_found": len(schema_info["schemas"]),
                "recommendation": "Review this schema structure and implement similar properties (e.g., FAQPage, Article, Organization) on your target pages to improve LLM citation probability."
            }
            recommendations.append(rec)
            
    return recommendations
