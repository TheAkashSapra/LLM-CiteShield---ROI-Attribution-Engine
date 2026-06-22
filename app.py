import streamlit as st
import os
import io
import time
import importlib
from dotenv import load_dotenv
import streamlit.components.v1 as components

import document_processor
importlib.reload(document_processor)
from verification_engine import search_claim, verify_claims_batch
from analytics_engine import calculate_csov, recommend_schema_optimizations
from db import save_run_data

# Load environment variables
load_dotenv(override=True)

def main():
    st.set_page_config(page_title="LLM CiteShield & ROI Attribution Engine", layout="wide")
    
    # Initialize application state
    if 'app_mode' not in st.session_state:
        st.session_state['app_mode'] = 'landing'
        
    if st.session_state['app_mode'] == 'landing':
        render_landing_page()
    elif st.session_state['app_mode'] == 'chat':
        render_chat_interface()

def render_landing_page():
    # Display the Hero Banner
    try:
        st.image("banner.png", use_container_width=True)
    except Exception as e:
        pass
        
    st.markdown("<h1 style='text-align: center; color: #1e3c72; margin-top: 20px;'>Verify AI Claims. Protect Your Brand. Measure AI Search ROI.</h1>", unsafe_allow_html=True)
    st.markdown("<h4 style='text-align: center; color: #445566; font-weight: normal; margin-bottom: 30px;'>Extract claims from PDFs, validate them with live web sources, and understand how AI assistants mention your brand across the web.</h4>", unsafe_allow_html=True)
    
    # We add a hook for JS to inject the buttons perfectly centered
    st.markdown("<div id='js-button-hook'></div>", unsafe_allow_html=True)
    st.markdown("<br><hr style='opacity: 0.2;'><br>", unsafe_allow_html=True)
    
    # Inject Custom Liquid UI Script
    try:
        with open("scprit.js", "r", encoding="utf-8") as f:
            js_code = f.read()
        components.html(f"<script>{js_code}</script>", height=0, width=0)
    except FileNotFoundError:
        pass
        
    uploaded_file = st.file_uploader("Upload a PDF document to analyze", type="pdf")
    
    if uploaded_file is not None:
        if st.button("Start Processing"):
            # Serialize the PDF into session state
            st.session_state['pdf_bytes'] = uploaded_file.read()
            st.session_state['pdf_name'] = uploaded_file.name
            st.session_state['target_brand'] = "MyBrand" # Default, can be updated in chat settings
            
            # Switch the state and instantly rerun to vanish the landing page UI
            st.session_state['app_mode'] = 'chat'
            st.rerun()

    st.markdown("<div id='js-claim-hook'></div>", unsafe_allow_html=True)

def render_chat_interface():
    st.markdown("<h1 id='citeshield-chat-engine' style='color: #1e3c72;'>CiteShield AI Engine</h1>", unsafe_allow_html=True)

    # Configuration Sidebar
    with st.sidebar:
        st.header("Configuration")
        target_brand = st.text_input("Target Brand Name (for cSoV)", value=st.session_state.get('target_brand', 'MyBrand'))
        st.session_state['target_brand'] = target_brand
        
        st.divider()
        st.header("Chat History")
        st.write("Current Session History Active")
        if st.button("End Session & Return Home"):
            st.session_state['app_mode'] = 'landing'
            st.session_state['messages'] = []
            st.session_state['processed_pdf'] = False
            st.rerun()

    # Ensure the user has a document
    if 'pdf_bytes' not in st.session_state or st.session_state['pdf_bytes'] is None:
        st.warning("No document found. Please go back to the Home page and upload a PDF.")
        if st.button("← Back to Home"):
            st.session_state['app_mode'] = 'landing'
            st.rerun()
        st.stop()

    # Initialize session state for messages
    if 'messages' not in st.session_state:
        st.session_state['messages'] = []
        
    # Initialize processing flag
    if 'processed_pdf' not in st.session_state:
        st.session_state['processed_pdf'] = False

    # PROCESS THE PDF EXACTLY ONCE
    if not st.session_state['processed_pdf']:
        file_name = st.session_state.get('pdf_name', 'document.pdf')
        pdf_bytes = st.session_state['pdf_bytes']
        
        # Create a BytesIO object for PyPDF
        pdf_file = io.BytesIO(pdf_bytes)
        
        with st.status(f"Analyzing {file_name}...", expanded=True) as status:
            st.write("Step 1: Extracting text from PDF...")
            raw_text = document_processor.extract_text_from_pdf(pdf_file)
            st.session_state['pdf_text'] = raw_text
            
            st.write("Step 2: Parsing verifiable claims...")
            claims = document_processor.parse_claims_from_text(raw_text)
            
            if not claims:
                status.update(label="Analysis Failed", state="error")
                st.error("Could not extract any claims from this document.")
                st.stop()
                
            st.write(f"Identified {len(claims)} unique claims. Gathering search context...")
            batch_to_verify = []
            for claim_obj in claims:
                claim_text = claim_obj.get("claim", "")
                if claim_text:
                    context = search_claim(claim_text)
                    batch_to_verify.append({"claim": claim_text, "context": context})
                    
            st.write("Step 3: Verifying claims against live web sources...")
            verified_results = []
            if batch_to_verify:
                results = verify_claims_batch(batch_to_verify, target_brand)
                if results:
                    verified_results.extend(results)
                    
            st.write("Step 4: Calculating Citation Share of Voice...")
            csov_score = calculate_csov(verified_results)
            
            st.write("Step 5: Generating Schema Recommendations...")
            cited_urls = list(set([url for res in verified_results for url in res.get("cited_urls", [])]))
            recommendations = recommend_schema_optimizations(cited_urls)
            
            # Save to DB (Optional, silent)
            try:
                save_run_data(file_name, claims, verified_results, csov_score, recommendations)
            except:
                pass
                
            status.update(label="Analysis Complete!", state="complete", expanded=False)

        # Compile the results into a massive markdown message
        results_md = f"### Initial Document Analysis Complete!\n\n"
        results_md += f"**Document:** {file_name}\n"
        results_md += f"**Citation Share of Voice (cSoV):** {csov_score}%\n\n"
        
        results_md += "#### Verified Claims Dashboard\n"
        for res in verified_results:
            status_val = res.get("status", "Unknown")
            color = "🟢" if status_val == "Verified" else "🟠" if status_val == "Inaccurate" else "🔴"
            results_md += f"**{color} [{status_val}]** {res.get('claim', '')}\n"
            results_md += f"> *{res.get('explanation', 'N/A')}*\n\n"
            
        if recommendations:
            results_md += "#### Schema Optimization Opportunities\n"
            for rec in recommendations:
                results_md += f"- **URL:** {rec['url']}\n  - **Recommendation:** {rec['recommendation']}\n"
                
        results_md += "\n---\n*What else would you like to know about this document or these claims?*"
        
        # Append to chat history
        st.session_state['messages'].append({"role": "assistant", "content": results_md})
        st.session_state['processed_pdf'] = True
        st.rerun()

    # RENDER CHAT INTERFACE
    for message in st.session_state['messages']:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # CHAT INPUT
    if prompt := st.chat_input("Ask a question about this document or its claims..."):
        # Append user message
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        # Generate assistant response
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            message_placeholder.markdown("...")
            
            document_text = st.session_state.get('pdf_text', '')
            response = document_processor.chat_with_document(document_text, st.session_state.messages)
            
            message_placeholder.markdown(response)
            
        st.session_state.messages.append({"role": "assistant", "content": response})

if __name__ == "__main__":
    main()
