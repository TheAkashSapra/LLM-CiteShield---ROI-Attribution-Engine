# LLM CiteShield & ROI Attribution Engine 🛡️

[Demo video:](https://drive.google.com/file/d/1pyhXA8L2PQZZ8cnUGKCvAtZ2Tu-7AKzx/view?usp=sharing)

LLM CiteShield is a cutting-edge platform designed to protect your brand's integrity against AI hallucinations and provide total visibility into your **AI Search ROI**.

With the rapid adoption of AI Assistants (like ChatGPT, Claude, and Gemini) and AI Search Engines (like Perplexity), brands are losing visibility into how their products and claims are being referenced. **LLM CiteShield** solves this by instantly extracting claims from your documents, validating them against the live web, measuring your "Citation Share of Voice", and giving you an interactive Chat Engine to query your protected data.

## ✨ Features

- **Automated Claim Extraction:** Upload any PDF document. The engine uses advanced LLMs (powered by Groq / Llama 3.3) to scan the text and isolate distinct, verifiable claims.
- **Live Web Verification:** Claims are automatically cross-referenced against live web search results to ensure accuracy and trace the origin of the information.
- **Citation Share of Voice (cSoV):** A proprietary analytics algorithm that calculates how strongly your brand is represented in the search results that validate your claims.
- **Schema Optimization Recommendations:** Analyzes the URLs citing your claims and generates actionable SEO Schema recommendations (e.g., `FAQPage`, `ClaimReview`) to boost your visibility in AI search systems.
- **Single-Page Chat Engine:** An interactive, glassmorphism-styled chat interface that allows you to directly interrogate the uploaded document and its verified claims.
- **Stunning UI/UX:** Built with a custom Streamlit architecture injected with advanced JavaScript and CSS, featuring a beautiful frosted-glass liquid gradient aesthetic.

## 🏗️ Architecture

The system is built entirely in Python using Streamlit for the frontend, but heavily relies on a custom JavaScript bridge (`scprit.js`) to break out of Streamlit's native constraints and provide a modern Single-Page Application (SPA) experience.

- **`app.py`**: The core Streamlit application file. Handles file uploads, session state, routing, and the injection of custom frontend code.
- **`document_processor.py`**: Handles PDF parsing (`pypdf`) and communicates with the LLM API (`groq`) to extract claims and generate conversational responses.
- **`verification_engine.py`**: Executes live web searches and asynchronously batches claims to verify them against external sources using an LLM evaluator.
- **`analytics_engine.py`**: Processes the verified claims to calculate the Citation Share of Voice and generate Schema optimization recommendations.
- **`db.py`**: A MongoDB integration layer (optional) to silently log verification runs and historical attribution scores.
- **`scprit.js`**: A massive custom JavaScript payload injected into the Streamlit DOM. It controls the animated liquid background, the glassmorphism CSS, the smooth-scrolling CTA buttons, and the interactive loading animations.

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- A Groq API Key (Free tier allows 14,400 requests/day)
- (Optional) MongoDB Connection String for database logging

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/LLM-CiteShield-ROI-Attribution-Engine.git
   cd LLM-CiteShield-ROI-Attribution-Engine
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   # source venv/bin/activate    # On Mac/Linux
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   MONGO_URI=your_mongodb_connection_string_here
   ```

### Running the App

Start the Streamlit server:
```bash
python -m streamlit run app.py
```

The app will automatically open in your default web browser at `http://localhost:8501`.

## 🧠 How the Workflow Operates

1. **Upload:** You land on the gorgeous liquid-gradient Home Page. You drop a PDF into the uploader and click "Start Processing".
2. **Analysis:** The screen transitions to an elegant frosted glass loader. The system extracts text, asks Groq to isolate claims, and verifies them on the live web.
3. **Dashboard:** The processing completes, and you are instantly transitioned to the Chat Engine. A massive Markdown dashboard is printed detailing the Verification Status of every claim, your overall cSoV score, and actionable SEO recommendations.
4. **Interrogate:** You can now use the Chat Input to ask questions directly about the document or the verified claims.

---
*Built to bring truth, attribution, and ROI tracking to the generative AI era.*
