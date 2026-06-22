import os
from pymongo import MongoClient
import datetime

def get_db_collection(collection_name="verifications"):
    """Initializes MongoDB connection and returns the specified collection."""
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        client.admin.command('ping') # Test connection
        db = client["citeshield_db"]
        return db[collection_name]
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return None

def save_run_data(filename: str, claims: list, verified_results: list, csov: float, recommendations: list):
    """Saves the entire run data to MongoDB."""
    collection = get_db_collection("runs")
    if collection is not None:
        document = {
            "timestamp": datetime.datetime.utcnow(),
            "filename": filename,
            "total_claims": len(claims),
            "verified_results": verified_results,
            "csov": csov,
            "recommendations": recommendations
        }
        try:
            result = collection.insert_one(document)
            return str(result.inserted_id)
        except Exception as e:
            print(f"Error saving to MongoDB: {e}")
            return None
    return None
