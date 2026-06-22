const parentDoc = window.parent.document;

// Ensure glassmorphism styles are injected
if (!parentDoc.getElementById('loader-styles')) {
    const style = parentDoc.createElement("style");
    style.id = "loader-styles";
    style.innerHTML = `
        @keyframes liquidBox {
            0% { transform: rotate(0deg) scale(1); background-position: 0% 50%; }
            50% { transform: rotate(180deg) scale(1.5); background-position: 100% 50%; }
            100% { transform: rotate(360deg) scale(1); background-position: 0% 50%; }
        }
        @keyframes shimmerSlide {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
        }
        .shimmer-grid {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
            background-size: 30px 30px;
            animation: shimmerSlide 5s linear infinite;
            opacity: 0.7;
            z-index: 0;
            -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 80%);
            mask-image: radial-gradient(circle at center, black 10%, transparent 80%);
        }
        
        .magic-star {
            position: relative;
            width: 90px;
            height: 90px;
            background: linear-gradient(45deg, #00c6ff, #ff00cc, #ffcc00, #ff9900);
            background-size: 300% 300%;
            clip-path: polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%);
            animation: starBreathe 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 2;
        }
        @keyframes starBreathe {
            0% { transform: scale(0.8) rotate(0deg); filter: hue-rotate(0deg); background-position: 0% 50%; }
            50% { transform: scale(1.3) rotate(90deg); filter: hue-rotate(180deg); background-position: 100% 50%; }
            100% { transform: scale(0.8) rotate(180deg); filter: hue-rotate(360deg); background-position: 0% 50%; }
        }
        
        .sparkle {
            position: absolute;
            width: 5px; height: 5px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 15px 3px rgba(255, 204, 0, 0.8), 0 0 5px 1px rgba(255, 255, 255, 0.8);
            animation: floatUp 2.5s infinite ease-in;
            z-index: 1;
        }
        @keyframes floatUp {
            0% { transform: translateY(20px) scale(0); opacity: 0; }
            20% { opacity: 1; transform: translateY(10px) scale(1.2); }
            80% { opacity: 0.8; transform: translateY(-40px) scale(0.8); }
            100% { transform: translateY(-60px) scale(0); opacity: 0; }
        }
        
        .custom-loader-box {
            position: relative; 
            width: 100%; 
            max-width: 500px;
            height: 350px; 
            margin: 20px auto;
            border: 1px solid rgba(0, 0, 0, 0.1); 
            border-radius: 20px; 
            background: rgba(255, 255, 255, 0.4); 
            backdrop-filter: blur(15px); 
            -webkit-backdrop-filter: blur(15px); 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            justify-content: space-between; 
            align-items: center; 
            padding: 25px; 
            box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.15);
        }
        
        /* Light glassmorphism for normal UI */
        .stApp { background-color: transparent !important; }
        .stApp > header { background-color: transparent !important; }
        .stSidebar > div:first-child {
            background: rgba(255, 255, 255, 0.6) !important;
            backdrop-filter: blur(16px) !important;
            border-right: 1px solid rgba(0, 0, 0, 0.05);
        }
        div.stButton > button, div[data-testid="stMetric"], .stExpander, div[data-testid="stFileUploader"] {
            background: rgba(255, 255, 255, 0.6) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.8) !important;
            border-radius: 20px !important;
            color: #1e3c72 !important;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05) !important;
            transition: all 0.3s ease;
        }
        div.stButton > button:hover {
            background: rgba(255, 255, 255, 0.9) !important;
            transform: translateY(-3px);
            box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.1) !important;
        }
        h1, h2, h3, p, span, div, label {
            color: #1e3c72 !important; /* Deep Blue for readability */
            text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }

        /* Chat Engine Glassmorphism Styles */
        [data-testid="stChatMessage"] {
            background: rgba(255, 255, 255, 0.5) !important;
            backdrop-filter: blur(25px) !important;
            -webkit-backdrop-filter: blur(25px) !important;
            border: 1px solid rgba(255, 255, 255, 0.8) !important;
            border-radius: 20px !important;
            margin-bottom: 20px !important;
            padding: 15px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06) !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        [data-testid="stChatMessage"]:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
        }
        [data-testid="stChatMessage"] * {
            color: #1e3c72 !important;
        }
        
        [data-testid="stChatInput"] {
            background: rgba(255, 255, 255, 0.6) !important;
            backdrop-filter: blur(30px) !important;
            -webkit-backdrop-filter: blur(30px) !important;
            border: 1px solid rgba(255, 255, 255, 0.9) !important;
            border-radius: 30px !important;
            box-shadow: 0 15px 50px rgba(0, 114, 255, 0.15) !important;
            padding: 5px !important;
        }
        [data-testid="stChatInputTextArea"] {
            background: transparent !important;
            color: #1e3c72 !important;
            font-size: 16px !important;
        }
        [data-testid="stChatInputTextArea"]::placeholder {
            color: rgba(30, 60, 114, 0.5) !important;
        }
        [data-testid="stChatInputSubmitButton"] {
            background: linear-gradient(135deg, #00c6ff, #0072ff) !important;
            border-radius: 50% !important;
            color: white !important;
            box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4) !important;
        }
        [data-testid="stChatInputSubmitButton"] * {
            color: white !important;
        }
    `;
    parentDoc.head.appendChild(style);
}

// Background liquid blobs for the whole page (aesthetic)
if (!parentDoc.getElementById("liquid-bg-container")) {
    const bgContainer = parentDoc.createElement("div");
    bgContainer.id = "liquid-bg-container";
    bgContainer.innerHTML = `
        <div class="blob blob1" style="position: absolute; border-radius: 50%; filter: blur(30px); opacity: 0.7; width: 600px; height: 600px; background: linear-gradient(135deg, #ffcc00, #ff9900); top: -100px; left: -100px; animation: moveBlobs 25s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);"></div>
        <div class="blob blob2" style="position: absolute; border-radius: 50%; filter: blur(30px); opacity: 0.6; width: 700px; height: 700px; background: linear-gradient(135deg, #00c6ff, #0072ff); bottom: -200px; right: -100px; animation: moveBlobs 20s infinite alternate-reverse cubic-bezier(0.4, 0, 0.2, 1);"></div>
    `;
    bgContainer.style.position = 'fixed';
    bgContainer.style.top = '0';
    bgContainer.style.left = '0';
    bgContainer.style.width = '100vw';
    bgContainer.style.height = '100vh';
    bgContainer.style.zIndex = '-1';
    bgContainer.style.background = '#fdfdfd'; // White base
    bgContainer.style.overflow = 'hidden';
    parentDoc.body.prepend(bgContainer);
}

// Custom CSS for the Native Streamlit File Uploader
if (!parentDoc.getElementById('uploader-glass-styles')) {
    const uploaderStyle = parentDoc.createElement('style');
    uploaderStyle.id = 'uploader-glass-styles';
    uploaderStyle.innerHTML = `
        [data-testid="stFileUploader"] {
            position: relative !important;
            background: rgba(255, 255, 255, 0.4) !important;
            backdrop-filter: blur(30px) !important;
            -webkit-backdrop-filter: blur(30px) !important;
            border: 1px solid rgba(255, 255, 255, 0.9) !important;
            border-radius: 25px !important;
            padding: 40px !important;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08) !important;
            margin: 40px auto !important;
            max-width: 800px !important;
            z-index: 1 !important;
            overflow: hidden !important;
        }
        
        [data-testid="stFileUploader"]::before {
            content: '';
            position: absolute;
            top: -100px; left: -100px;
            width: 350px; height: 350px;
            background: linear-gradient(135deg, #fbc2eb, #a18cd1);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            filter: blur(50px);
            opacity: 0.6;
            z-index: -1;
            animation: morphBlob 10s infinite alternate ease-in-out;
            pointer-events: none;
        }
        
        [data-testid="stFileUploader"]::after {
            content: '';
            position: absolute;
            bottom: -100px; right: -100px;
            width: 400px; height: 400px;
            background: linear-gradient(135deg, #84fab0, #8fd3f4);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            filter: blur(60px);
            opacity: 0.6;
            z-index: -1;
            animation: morphBlob 12s infinite alternate-reverse ease-in-out;
            pointer-events: none;
        }
        
        [data-testid="stFileUploaderDropzone"] {
            background: rgba(255, 255, 255, 0.5) !important;
            border: 2px dashed rgba(0, 198, 255, 0.6) !important;
            border-radius: 15px !important;
            transition: all 0.3s ease !important;
            min-height: 150px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        [data-testid="stFileUploaderDropzone"]:hover {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: #0072ff !important;
            box-shadow: 0 0 25px rgba(0, 114, 255, 0.2) !important;
            transform: scale(1.02) !important;
        }
        
        [data-testid="stFileUploader"] label {
            font-size: 26px !important;
            font-weight: 900 !important;
            color: #1e3c72 !important;
            text-align: center !important;
            width: 100% !important;
            display: block !important;
            margin-bottom: 25px !important;
            text-shadow: 0 1px 2px rgba(255,255,255,0.8) !important;
        }
        
        [data-testid="stFileUploaderDropzone"] span {
            font-size: 16px !important;
            color: #445566 !important;
            font-weight: 600 !important;
        }
        [data-testid="stFileUploaderDropzone"] svg {
            fill: #0072ff !important;
            width: 45px !important;
            height: 45px !important;
        }
        [data-testid="stFileUploaderDropzone"] button {
            background: linear-gradient(135deg, #00c6ff, #0072ff) !important;
            color: white !important;
            border-radius: 50px !important;
            font-weight: bold !important;
            border: none !important;
            box-shadow: 0 5px 15px rgba(0, 114, 255, 0.3) !important;
            transition: transform 0.2s, box-shadow 0.2s !important;
            padding: 8px 24px !important;
        }
        [data-testid="stFileUploaderDropzone"] button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 20px rgba(0, 114, 255, 0.4) !important;
        }
    `;
    parentDoc.head.appendChild(uploaderStyle);
}

// Track last known state to prevent infinite loops
let lastProcessingState = null;
let lineIndex = 0;
const entertainingLines = [
    "Extracting semantic entities...",
    "Aligning quantum tokens...",
    "Synthesizing claim embeddings...",
    "Cross-referencing global knowledge...",
    "Deconstructing document syntax...",
    "Reticulating splines...",
    "Parsing truth from fiction...",
    "Distilling pure facts..."
];

let intervalId = setInterval(() => {
    // SELF-DESTRUCT IF WE ARE IN CHAT ENGINE
    if (parentDoc.getElementById('citeshield-chat-engine')) {
        clearInterval(intervalId);
        return;
    }
    
    const loaderBox = parentDoc.getElementById('inline-custom-loader');
    if (loaderBox && loaderBox.style.display !== 'none') {
        const titleEl = parentDoc.getElementById('loader-task-title');
        const statusEl = parentDoc.getElementById('loader-task-status');
        if (titleEl && statusEl && titleEl.innerText === "Document Analysis") {
            observer.disconnect();
            lineIndex = (lineIndex + 1) % entertainingLines.length;
            statusEl.innerText = entertainingLines[lineIndex];
            lastStatus = entertainingLines[lineIndex];
            observer.observe(parentDoc.body, { childList: true, subtree: true, characterData: true });
        }
    }
}, 1800);

// MutationObserver to watch Streamlit UI for Spinners or specific text updates
const observer = new MutationObserver((mutations) => {
    // SELF-DESTRUCT IF WE ARE IN CHAT ENGINE
    const chatTitleNodes = Array.from(parentDoc.querySelectorAll('h1'));
    const isChatEngine = chatTitleNodes.some(el => el.innerText && el.innerText.includes('CiteShield AI Engine'));
    
    if (isChatEngine) {
        const toRemove = [
            'uploader-glass-styles',
            'inline-custom-loader', 'custom-saas-buttons', 'custom-workflow-ui',
            'custom-probsol-ui', 'custom-claim-ui', 'custom-shield-ui',
            'custom-whychoose-ui', 'custom-testimonials-ui', 'custom-cta-ui',
            'custom-footer-ui'
        ];
        toRemove.forEach(id => {
            const el = parentDoc.getElementById(id);
            if (el) el.remove();
        });
        observer.disconnect();
        return;
    }

    let isProcessing = false;
    let currentStatus = "Working on it...";
    let currentTitle = "Processing Task";

    // 1. Determine if we are processing based on Streamlit's native elements
    const spinners = parentDoc.querySelectorAll('[data-testid="stSpinner"]');
    if (spinners && spinners.length > 0) {
        isProcessing = true;
        currentStatus = spinners[spinners.length - 1].innerText || currentStatus;
        if (currentStatus.includes("Extracting") || currentStatus.includes("Parsing")) {
            currentTitle = "Document Analysis";
        } else if (currentStatus.includes("schema") || currentStatus.includes("Saving")) {
            currentTitle = "Data Finalization";
        }
    }
    
    const textElements = Array.from(parentDoc.querySelectorAll('[data-testid="stText"]'));
    const processingText = textElements.find(el => el.innerText.includes("Processing Batch") || el.innerText.includes("Batch") || el.innerText.includes("Cooldown"));
    if (processingText) {
        isProcessing = true;
        currentStatus = processingText.innerText;
        currentTitle = currentStatus.includes("Cooldown") ? "Rate Limit Cooldown" : "Web Verification";
    }
    
    // Check if dashboard is ready to override processing state
    const headers = Array.from(parentDoc.querySelectorAll('h2'));
    if (headers.some(el => el.innerText.includes("Results Dashboard"))) {
        isProcessing = false;
    }

    // DISCONNECT OBSERVER BEFORE DOM CHANGES TO PREVENT INFINITE LOOP
    observer.disconnect();

    // 2. Manipulate the UI based on state
    const fileUploader = parentDoc.querySelector('[data-testid="stFileUploader"]');
    const progressBars = parentDoc.querySelectorAll('[data-testid="stProgress"]');
    let loaderBox = parentDoc.getElementById('inline-custom-loader');

    if (isProcessing) {
        // Hide standard loading UI safely
        spinners.forEach(s => { if (s.style.display !== 'none') s.style.display = 'none'; });
        progressBars.forEach(p => { if (p.style.display !== 'none') p.style.display = 'none'; });
        if (processingText && processingText.style.display !== 'none') processingText.style.display = 'none';

        if (fileUploader && fileUploader.style.display !== 'none') fileUploader.style.display = 'none';
        
        const buttons = Array.from(parentDoc.querySelectorAll('[data-testid="baseButton-secondary"]'));
        const startBtn = buttons.find(b => b.innerText && b.innerText.includes("Start Processing"));
        if (startBtn && startBtn.style.display !== 'none') startBtn.style.display = 'none';

        // Create loader if it doesn't exist
        if (!loaderBox) {
            loaderBox = parentDoc.createElement('div');
            loaderBox.id = 'inline-custom-loader';
            loaderBox.className = 'custom-loader-box';
            loaderBox.style.background = 'rgba(255, 255, 255, 0.15)'; // Pure liquid transparent glass
            loaderBox.style.backdropFilter = 'blur(25px)';
            loaderBox.innerHTML = `
                <!-- Full Rainbow Spectrum Liquid Background -->
                <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); background-size: 600% 600%; z-index: -1; opacity: 0.65; filter: blur(35px); animation: liquidBox 10s ease-in-out infinite alternate;"></div>
                
                <div class="shimmer-grid"></div>
                
                <div id="loader-task-status" style="z-index: 3; font-size: 15px; color: #1e3c72; text-align: center; margin-top: 10px; font-weight: 700; letter-spacing: 0.5px;">Initializing...</div>
                
                <div style="z-index: 2; display: flex; justify-content: center; align-items: center; flex-grow: 1; position: relative; width: 100%;">
                    <!-- Full Rainbow Spectrum Magic Star -->
                    <div class="magic-star" style="background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); background-size: 600% 600%;"></div>
                    <div class="sparkle" style="left: 30%; top: 30%; animation-delay: 0s;"></div>
                    <div class="sparkle" style="left: 60%; top: 70%; animation-delay: 0.5s;"></div>
                    <div class="sparkle" style="left: 70%; top: 20%; animation-delay: 1.2s;"></div>
                    <div class="sparkle" style="left: 40%; top: 80%; animation-delay: 1.8s;"></div>
                    <div class="sparkle" style="left: 50%; top: 40%; animation-delay: 0.8s;"></div>
                    <div class="sparkle" style="left: 20%; top: 50%; animation-delay: 2.1s;"></div>
                </div>
                
                <div id="loader-task-title" style="z-index: 3; font-size: 28px; font-weight: 900; color: #1e3c72; text-align: center; text-shadow: 0 1px 4px rgba(255,255,255,0.9); line-height: 1.2; margin-bottom: 20px;">Processing Task</div>
            `;
            
            const mainBlock = parentDoc.querySelector('.stMainBlockContainer') || parentDoc.body;
            if (fileUploader && fileUploader.parentNode) {
                fileUploader.parentNode.insertBefore(loaderBox, fileUploader.nextSibling);
            } else {
                mainBlock.prepend(loaderBox);
            }
        }
        
        // Update texts ONLY if they changed (prevents DOM thrashing)
        if (loaderBox && loaderBox.style.display !== 'flex') loaderBox.style.display = 'flex';
        
        if (lastStatus !== currentStatus) {
            const statusEl = parentDoc.getElementById('loader-task-status');
            if (statusEl) statusEl.innerText = currentStatus;
            lastStatus = currentStatus;
        }
        
        if (lastTitle !== currentTitle) {
            const titleEl = parentDoc.getElementById('loader-task-title');
            if (titleTitle = parentDoc.getElementById('loader-task-title'));
            if (titleEl) titleEl.innerText = currentTitle;
            lastTitle = currentTitle;
        }

    } else {
        // Processing finished! Revert UI safely
        if (loaderBox && loaderBox.style.display !== 'none') {
            loaderBox.style.display = 'none';
        }
        
        const hasStarted = sessionStorage.getItem("startAnalysisClicked");
        const isDashboardReady = headers.some(el => el.innerText.includes("Results Dashboard"));
        
        // Always show uploader on landing page
        if (fileUploader && fileUploader.style.display !== 'block') fileUploader.style.display = 'block';
        const buttons = Array.from(parentDoc.querySelectorAll('[data-testid="baseButton-secondary"]'));
        const startBtn = buttons.find(b => b.innerText && b.innerText.includes("Start Processing"));
        if (startBtn && startBtn.style.display !== 'inline-flex') startBtn.style.display = 'inline-flex';
        
        spinners.forEach(s => { if (s.style.display !== 'block') s.style.display = 'block'; });
        progressBars.forEach(p => { if (p.style.display !== 'block') p.style.display = 'block'; });
        if (processingText && processingText.style.display !== 'block') processingText.style.display = 'block';
    }

    // RECONNECT OBSERVER AFTER DOM CHANGES
    observer.observe(parentDoc.body, { childList: true, subtree: true, characterData: true });
});

observer.observe(parentDoc.body, { childList: true, subtree: true, characterData: true });

// Inject perfectly centered CTA Buttons
const buttonHook = parentDoc.getElementById('js-button-hook');
if (buttonHook && !parentDoc.getElementById('custom-saas-buttons')) {
    const btnContainer = parentDoc.createElement('div');
    btnContainer.id = 'custom-saas-buttons';
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'center';
    btnContainer.style.gap = '20px';
    btnContainer.style.alignItems = 'center';
    btnContainer.style.marginTop = '10px';
    btnContainer.style.marginBottom = '20px';
    
    btnContainer.innerHTML = `
        <button id="btn-start-analysis" style="background: linear-gradient(135deg, #00c6ff, #0072ff); color: white; padding: 12px 28px; border-radius: 30px; text-align: center; font-weight: bold; font-size: 16px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 114, 255, 0.4); transition: transform 0.2s;">
            🚀 Start Free Analysis
        </button>
        <button id="btn-watch-demo" style="background: white; color: #0072ff; border: 2px solid #0072ff; padding: 10px 28px; border-radius: 30px; text-align: center; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s;">
            ▶ Watch Demo
        </button>
    `;
    // Insert custom buttons after the hook
    buttonHook.appendChild(btnContainer);
    
    // Insert Workflow UI right after the buttons
    const workflowContainer = parentDoc.createElement('div');
    workflowContainer.id = 'custom-workflow-ui';
    workflowContainer.style.display = 'flex';
    workflowContainer.style.flexDirection = 'column';
    workflowContainer.style.alignItems = 'center';
    workflowContainer.style.marginTop = '60px';
    workflowContainer.style.marginBottom = '20px';
    
    if (!parentDoc.getElementById('workflow-styles')) {
        const wfStyle = parentDoc.createElement('style');
        wfStyle.id = 'workflow-styles';
        wfStyle.innerHTML = `
            .workflow-row {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 15px;
                max-width: 1000px;
                margin: 0 auto;
            }
            .workflow-step {
                background: rgba(255, 255, 255, 0.4);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.9);
                border-radius: 15px;
                padding: 15px 20px;
                text-align: center;
                font-weight: bold;
                color: #1e3c72;
                box-shadow: 0 8px 25px rgba(0,0,0,0.05);
                position: relative;
                transition: all 0.3s ease;
                min-width: 140px;
                flex: 1 1 auto;
            }
            .workflow-step:hover {
                transform: translateY(-5px) scale(1.02);
                box-shadow: 0 12px 30px rgba(0,114,255,0.2);
                border-color: #00c6ff;
                background: rgba(255, 255, 255, 0.9);
            }
            .workflow-arrow {
                color: #0072ff;
                font-size: 20px;
                font-weight: bold;
                animation: pulseArrow 2s infinite;
                margin: 0 5px;
            }
            @keyframes pulseArrow {
                0% { transform: translateX(0); opacity: 0.4; }
                50% { transform: translateX(5px); opacity: 1; }
                100% { transform: translateX(0); opacity: 0.4; }
            }
            .workflow-icon {
                font-size: 28px;
                margin-bottom: 8px;
                display: block;
            }
            @media (max-width: 768px) {
                .workflow-row { flex-direction: column; }
                .workflow-arrow { transform: rotate(90deg); animation: pulseArrowDown 2s infinite; margin: 10px 0; }
                @keyframes pulseArrowDown {
                    0% { transform: rotate(90deg) translateY(0); opacity: 0.4; }
                    50% { transform: rotate(90deg) translateY(-5px); opacity: 1; }
                    100% { transform: rotate(90deg) translateY(0); opacity: 0.4; }
                }
            }
            @keyframes liquidWorkflow {
                0% { transform: scaleX(1) scaleY(1) translateY(0) skewX(0deg); border-radius: 50px; }
                100% { transform: scaleX(1.05) scaleY(1.3) translateY(-5px) skewX(2deg); border-radius: 40% 60% 50% 40%; }
            }
        `;
        parentDoc.head.appendChild(wfStyle);
    }

    workflowContainer.innerHTML = `
        <h3 style="color: #445566; margin-bottom: 30px; font-weight: 600; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">The Citation Engine Workflow</h3>
        
        <div style="position: relative; width: 100%; max-width: 1050px; padding: 20px 0;">
            <!-- LIQUID GRADIENT BLOB BEHIND THE WORKFLOW -->
            <div style="position: absolute; top: 10%; left: 5%; width: 90%; height: 80%; background: linear-gradient(90deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb, #00c6ff); filter: blur(35px); opacity: 0.65; z-index: 0; animation: liquidWorkflow 6s infinite alternate ease-in-out;"></div>
            
            <div class="workflow-row" style="position: relative; z-index: 1;">
                <div class="workflow-step">
                    <span class="workflow-icon">&#128196;</span>
                    PDF Upload
                </div>
                <div class="workflow-arrow">&#8594;</div>
                <div class="workflow-step">
                    <span class="workflow-icon">&#129488;</span>
                    Claim Extraction
                </div>
                <div class="workflow-arrow">&#8594;</div>
                <div class="workflow-step">
                    <span class="workflow-icon">&#127183;</span>
                    Live Verification
                </div>
                <div class="workflow-arrow">&#8594;</div>
                <div class="workflow-step">
                    <span class="workflow-icon">&#127919;</span>
                    Citation Score
                </div>
                <div class="workflow-arrow">&#8594;</div>
                <div class="workflow-step" style="background: rgba(255, 255, 255, 0.6); border: 1px solid #00c6ff; box-shadow: 0 0 20px rgba(0, 198, 255, 0.2);">
                    <span class="workflow-icon">&#128200;</span>
                    Brand AI ROI
                </div>
            </div>
        </div>
    `;
    
    // Insert after the buttons container
    buttonHook.parentNode.insertBefore(workflowContainer, buttonHook.nextSibling);
    
    // Insert Problem and Solution Section
    const probSolContainer = parentDoc.createElement('div');
    probSolContainer.id = 'custom-probsol-ui';
    probSolContainer.style.display = 'flex';
    probSolContainer.style.flexWrap = 'wrap';
    probSolContainer.style.justifyContent = 'center';
    probSolContainer.style.gap = '30px';
    probSolContainer.style.maxWidth = '1100px';
    probSolContainer.style.margin = '50px auto 60px auto';
    probSolContainer.style.padding = '0 20px';

    if (!parentDoc.getElementById('probsol-styles')) {
        const psStyle = parentDoc.createElement('style');
        psStyle.id = 'probsol-styles';
        psStyle.innerHTML = `
            .glass-card {
                position: relative;
                flex: 1 1 400px;
                background: rgba(255, 255, 255, 0.5);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.8);
                border-radius: 25px;
                padding: 45px;
                overflow: hidden;
                box-shadow: 0 15px 35px rgba(0,0,0,0.06);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .glass-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 25px 50px rgba(0,114,255,0.15);
            }
            .liquid-blob-red {
                position: absolute;
                top: -60px; right: -60px;
                width: 250px; height: 250px;
                background: linear-gradient(135deg, #ff4b2b, #ff416c);
                border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                filter: blur(40px);
                opacity: 0.35;
                z-index: -1;
                animation: morphBlob 8s infinite alternate ease-in-out;
            }
            .liquid-blob-blue {
                position: absolute;
                bottom: -60px; left: -60px;
                width: 300px; height: 300px;
                background: linear-gradient(135deg, #00c6ff, #0072ff);
                border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                filter: blur(50px);
                opacity: 0.35;
                z-index: -1;
                animation: morphBlob 10s infinite alternate-reverse ease-in-out;
            }
            @keyframes morphBlob {
                0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1) rotate(0deg); }
                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(30px, 30px) scale(1.1) rotate(20deg); }
            }
            .ps-title {
                font-size: 26px;
                font-weight: 800;
                color: #1e3c72;
                margin-bottom: 20px;
                line-height: 1.3;
                text-shadow: 0 1px 2px rgba(255,255,255,0.8);
            }
            .ps-subtitle {
                font-size: 16px;
                color: #445566;
                margin-bottom: 25px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .problem-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .problem-list li {
                font-size: 16px;
                color: #334455;
                margin-bottom: 18px;
                display: flex;
                align-items: flex-start;
                line-height: 1.5;
                font-weight: 500;
            }
            .problem-list li span {
                margin-right: 15px;
                font-size: 18px;
                margin-top: 2px;
            }
            .solution-text {
                font-size: 18px;
                color: #1e3c72;
                line-height: 1.7;
                font-weight: 500;
                position: relative;
            }
        `;
        parentDoc.head.appendChild(psStyle);
    }

    probSolContainer.innerHTML = `
        <div class="glass-card">
            <div class="liquid-blob-red"></div>
            <h2 class="ps-title">AI Hallucinations and Missing Attribution Are Costing Businesses</h2>
            <p class="ps-subtitle">COMPANIES STRUGGLE WITH:</p>
            <ul class="problem-list">
                <li><span>&#10060;</span> Unverified claims in reports and documents</li>
                <li><span>&#10060;</span> AI-generated misinformation</li>
                <li><span>&#10060;</span> No visibility into how AI assistants reference their brand</li>
                <li><span>&#10060;</span> Inability to measure AI search impact</li>
                <li><span>&#10060;</span> Lost trust and missed opportunities</li>
            </ul>
        </div>
        
        <div class="glass-card">
            <div class="liquid-blob-blue"></div>
            <h2 class="ps-title">One Platform for Verification and AI Brand Analytics</h2>
            <p class="ps-subtitle">THE SOLUTION:</p>
            <div class="solution-text">
                <p><strong>LLM CiteShield</strong> automatically extracts claims, verifies them against live web sources, and tracks your brand's performance in AI search.</p>
                <br>
                <p>Deploy a proactive defense to gain total clarity, protect your reputation, and definitively prove the ROI of your AI visibility strategy.</p>
            </div>
        </div>
    `;

    workflowContainer.parentNode.insertBefore(probSolContainer, workflowContainer.nextSibling);
    
    // Inject Claim Extraction Section right below the file uploader hook
    const claimHook = parentDoc.getElementById('js-claim-hook');
    if (claimHook && !parentDoc.getElementById('custom-claim-ui')) {
        const claimContainer = parentDoc.createElement('div');
        claimContainer.id = 'custom-claim-ui';
        claimContainer.style.position = 'relative';
        claimContainer.style.maxWidth = '950px';
        claimContainer.style.margin = '50px auto';
        claimContainer.style.padding = '0 20px';

        if (!parentDoc.getElementById('claim-styles')) {
            const claimStyle = parentDoc.createElement('style');
            claimStyle.id = 'claim-styles';
            claimStyle.innerHTML = `
                .claim-glass-card {
                    position: relative;
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(30px);
                    -webkit-backdrop-filter: blur(30px);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                    border-radius: 25px;
                    padding: 50px;
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.06);
                    z-index: 1;
                }
                .liquid-blob-purple {
                    position: absolute;
                    top: -100px; left: -100px;
                    width: 350px; height: 350px;
                    background: linear-gradient(135deg, #a18cd1, #fbc2eb);
                    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                    filter: blur(50px);
                    opacity: 0.55;
                    z-index: 0;
                    animation: morphBlob 12s infinite alternate ease-in-out;
                }
                .liquid-blob-orange {
                    position: absolute;
                    bottom: -100px; right: -100px;
                    width: 400px; height: 400px;
                    background: linear-gradient(135deg, #ff9a44, #fc6076);
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    filter: blur(60px);
                    opacity: 0.55;
                    z-index: 0;
                    animation: morphBlob 10s infinite alternate-reverse ease-in-out;
                }
                .claim-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                }
                .claim-title {
                    font-size: 36px;
                    font-weight: 900;
                    color: #1e3c72;
                    margin-bottom: 15px;
                    letter-spacing: -0.5px;
                    text-shadow: 0 1px 3px rgba(255,255,255,0.8);
                }
                .claim-desc {
                    font-size: 18px;
                    color: #445566;
                    margin-bottom: 35px;
                    line-height: 1.6;
                    font-weight: 500;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 25px;
                }
                .benefit-item {
                    background: rgba(255, 255, 255, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 18px;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.04);
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .claim-container-orange .benefit-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(255,154,68,0.25);
                    border-color: #ff9a44;
                    background: rgba(255, 255, 255, 0.9);
                }
                .claim-container-green .benefit-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,201,155,0.25);
                    border-color: #00c99b;
                    background: rgba(255, 255, 255, 0.9);
                }
                .liquid-blob-green {
                    position: absolute;
                    top: -80px; left: -80px;
                    width: 320px; height: 320px;
                    background: linear-gradient(135deg, #00c99b, #0072ff);
                    border-radius: 50% 30% 60% 40% / 40% 50% 60% 50%;
                    filter: blur(50px);
                    opacity: 0.5;
                    z-index: 0;
                    animation: morphBlob 14s infinite alternate ease-in-out;
                }
                .liquid-blob-teal {
                    position: absolute;
                    bottom: -80px; right: -80px;
                    width: 380px; height: 380px;
                    background: linear-gradient(135deg, #43e97b, #38f9d7);
                    border-radius: 30% 60% 40% 70% / 60% 30% 70% 40%;
                    filter: blur(60px);
                    opacity: 0.5;
                    z-index: 0;
                    animation: morphBlob 11s infinite alternate-reverse ease-in-out;
                }
                .benefit-icon {
                    font-size: 32px;
                    margin-bottom: 12px;
                    display: block;
                }
                .benefit-text {
                    font-weight: 800;
                    color: #1e3c72;
                    font-size: 16px;
                }
            `;
            parentDoc.head.appendChild(claimStyle);
        }

        claimContainer.className = 'claim-container-orange';
        claimContainer.innerHTML = `
            <div class="liquid-blob-purple"></div>
            <div class="liquid-blob-orange"></div>
            <div class="claim-glass-card">
                <div class="claim-content">
                    <h2 class="claim-title">Claim Extraction</h2>
                    <p class="claim-desc">Upload PDFs and automatically identify factual statements and claims buried deep inside your documents.</p>
                    
                    <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #667788; margin-bottom: 20px; font-weight: 700;">Benefits</h3>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <span class="benefit-icon">&#9889;</span>
                            <span class="benefit-text">Fast Processing</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">&#128202;</span>
                            <span class="benefit-text">Structured Outputs</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">&#127919;</span>
                            <span class="benefit-text">High Accuracy</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        claimHook.appendChild(claimContainer);
        
        // Inject Citation Shield Section directly below Claim Extraction
        const shieldContainer = parentDoc.createElement('div');
        shieldContainer.id = 'custom-shield-ui';
        shieldContainer.className = 'claim-container-green';
        shieldContainer.style.position = 'relative';
        shieldContainer.style.maxWidth = '950px';
        shieldContainer.style.margin = '40px auto 50px auto';
        shieldContainer.style.padding = '0 20px';
        
        shieldContainer.innerHTML = `
            <div class="liquid-blob-green"></div>
            <div class="liquid-blob-teal"></div>
            <div class="claim-glass-card">
                <div class="claim-content">
                    <h2 class="claim-title">Citation Shield</h2>
                    <p class="claim-desc">Detect unsupported or outdated information by cross-referencing claims against live web sources.</p>
                    
                    <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #667788; margin-bottom: 20px; font-weight: 700;">Benefits</h3>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <span class="benefit-icon">&#10004;&#65039;</span>
                            <span class="benefit-text">Fact Validation</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">&#128269;</span>
                            <span class="benefit-text">Source Traceability</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-icon">&#128300;</span>
                            <span class="benefit-text">Transparency</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        claimHook.appendChild(shieldContainer);
        
        // Inject Why Choose Us Section directly below Citation Shield
        const whyContainer = parentDoc.createElement('div');
        whyContainer.id = 'custom-why-ui';
        whyContainer.style.position = 'relative';
        whyContainer.style.maxWidth = '850px';
        whyContainer.style.margin = '40px auto 60px auto';
        whyContainer.style.padding = '0 20px';
        
        if (!parentDoc.getElementById('why-styles')) {
            const whyStyle = parentDoc.createElement('style');
            whyStyle.id = 'why-styles';
            whyStyle.innerHTML = `
                .liquid-blob-yellow {
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 320px; height: 320px;
                    background: linear-gradient(135deg, #f6d365, #fda085);
                    border-radius: 50% 30% 60% 40% / 40% 50% 60% 50%;
                    filter: blur(50px);
                    opacity: 0.55;
                    z-index: 0;
                    animation: morphBlob 12s infinite alternate ease-in-out;
                }
                .liquid-blob-pink {
                    position: absolute;
                    bottom: -60px; left: -60px;
                    width: 280px; height: 280px;
                    background: linear-gradient(135deg, #ff0844, #ffb199);
                    border-radius: 30% 60% 40% 70% / 60% 30% 70% 40%;
                    filter: blur(55px);
                    opacity: 0.45;
                    z-index: 0;
                    animation: morphBlob 9s infinite alternate-reverse ease-in-out;
                }
                .feature-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 25px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    transition: background 0.3s;
                }
                .feature-row:last-child {
                    border-bottom: none;
                }
                .feature-row:hover {
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 12px;
                }
                .feature-name {
                    font-size: 18px;
                    font-weight: 600;
                    color: #2c3e50;
                }
                .feature-check {
                    font-size: 20px;
                    filter: drop-shadow(0 2px 4px rgba(0,255,0,0.2));
                }
                .feature-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 25px;
                    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
                    margin-bottom: 10px;
                }
                .feature-header {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #667788;
                    font-weight: 800;
                }
            `;
            parentDoc.head.appendChild(whyStyle);
        }
        
        whyContainer.innerHTML = `
            <div class="liquid-blob-yellow"></div>
            <div class="liquid-blob-pink"></div>
            <div class="claim-glass-card" style="display: block; padding: 40px 50px;">
                <h2 class="claim-title" style="text-align: center; margin-bottom: 30px;">Why Choose Us</h2>
                
                <div class="feature-header-row">
                    <span class="feature-header">Feature</span>
                    <span class="feature-header" style="color: #0072ff;">LLM CiteShield</span>
                </div>
                
                <div class="feature-row">
                    <span class="feature-name">PDF Claim Extraction</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
                <div class="feature-row">
                    <span class="feature-name">Live Web Verification</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
                <div class="feature-row">
                    <span class="feature-name">Citation Confidence</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
                <div class="feature-row">
                    <span class="feature-name">AI Search ROI Tracking</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
                <div class="feature-row">
                    <span class="feature-name">Brand Visibility Analytics</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
                <div class="feature-row">
                    <span class="feature-name">Export Reports</span>
                    <span class="feature-check">&#10004;&#65039;</span>
                </div>
            </div>
        `;
        
        claimHook.appendChild(whyContainer);
        
        // Inject Testimonials Section directly below Why Choose Us
        const testiContainer = parentDoc.createElement('div');
        testiContainer.id = 'custom-testi-ui';
        testiContainer.style.position = 'relative';
        testiContainer.style.maxWidth = '1000px';
        testiContainer.style.margin = '40px auto 80px auto';
        testiContainer.style.padding = '0 20px';
        
        if (!parentDoc.getElementById('testi-styles')) {
            const testiStyle = parentDoc.createElement('style');
            testiStyle.id = 'testi-styles';
            testiStyle.innerHTML = `
                .liquid-blob-indigo {
                    position: absolute;
                    top: -40px; left: -40px;
                    width: 350px; height: 350px;
                    background: linear-gradient(135deg, #30cfd0, #330867);
                    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                    filter: blur(50px);
                    opacity: 0.5;
                    z-index: 0;
                    animation: morphBlob 11s infinite alternate ease-in-out;
                }
                .liquid-blob-violet {
                    position: absolute;
                    bottom: -40px; right: -40px;
                    width: 300px; height: 300px;
                    background: linear-gradient(135deg, #b12a5b, #ff8177);
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    filter: blur(50px);
                    opacity: 0.45;
                    z-index: 0;
                    animation: morphBlob 13s infinite alternate-reverse ease-in-out;
                }
                .testi-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                    position: relative;
                    z-index: 1;
                }
                .testi-card {
                    background: rgba(255, 255, 255, 0.45);
                    backdrop-filter: blur(30px);
                    -webkit-backdrop-filter: blur(30px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 20px;
                    padding: 30px 30px 40px 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                }
                .testi-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(48,207,208,0.25);
                    background: rgba(255, 255, 255, 0.7);
                    border-color: #30cfd0;
                }
                .testi-quote-mark {
                    font-size: 50px;
                    color: #30cfd0;
                    line-height: 1;
                    margin-bottom: 5px;
                    opacity: 0.6;
                    font-family: Georgia, serif;
                }
                .testi-text {
                    font-size: 19px;
                    color: #1e3c72;
                    font-weight: 600;
                    line-height: 1.6;
                    font-style: italic;
                }
            `;
            parentDoc.head.appendChild(testiStyle);
        }
        
        testiContainer.innerHTML = `
            <div class="liquid-blob-indigo"></div>
            <div class="liquid-blob-violet"></div>
            
            <h2 class="claim-title" style="text-align: center; margin-bottom: 40px; position: relative; z-index: 1; color: #1e3c72;">What Our Users Say</h2>
            
            <div class="testi-grid">
                <div class="testi-card">
                    <div class="testi-quote-mark">&ldquo;</div>
                    <p class="testi-text">Reduced manual verification time by 90%.</p>
                </div>
                <div class="testi-card">
                    <div class="testi-quote-mark">&ldquo;</div>
                    <p class="testi-text">Finally, a way to measure AI search impact.</p>
                </div>
                <div class="testi-card">
                    <div class="testi-quote-mark">&ldquo;</div>
                    <p class="testi-text">Improved trust in our research reports.</p>
                </div>
            </div>
        `;
        
        claimHook.appendChild(testiContainer);
        
        // Inject Final CTA Section directly below Testimonials
        const ctaContainer = parentDoc.createElement('div');
        ctaContainer.id = 'custom-cta-ui';
        ctaContainer.style.position = 'relative';
        ctaContainer.style.maxWidth = '900px';
        ctaContainer.style.margin = '40px auto 100px auto';
        ctaContainer.style.padding = '0 20px';
        
        if (!parentDoc.getElementById('cta-styles')) {
            const ctaStyle = parentDoc.createElement('style');
            ctaStyle.id = 'cta-styles';
            ctaStyle.innerHTML = `
                .liquid-blob-fusion {
                    position: absolute;
                    top: -50px; left: 50%;
                    transform: translateX(-50%);
                    width: 500px; height: 350px;
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                    filter: blur(60px);
                    opacity: 0.6;
                    z-index: 0;
                    animation: morphBlob 10s infinite alternate ease-in-out;
                }
                .cta-glass-card {
                    background: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(40px);
                    -webkit-backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                    border-radius: 30px;
                    padding: 60px 40px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }
                .cta-title {
                    font-size: 42px;
                    font-weight: 900;
                    color: #1e3c72;
                    margin-bottom: 20px;
                    letter-spacing: -1px;
                }
                .cta-desc {
                    font-size: 20px;
                    color: #445566;
                    margin-bottom: 40px;
                    font-weight: 500;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.5;
                }
                .cta-button-container {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .cta-btn-primary {
                    background: linear-gradient(135deg, #00c6ff, #0072ff);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 16px 35px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 10px 20px rgba(0, 114, 255, 0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .cta-btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px rgba(0, 114, 255, 0.4);
                }
                .cta-btn-secondary {
                    background: rgba(255, 255, 255, 0.8);
                    color: #1e3c72;
                    border: 2px solid rgba(255, 255, 255, 0.9);
                    border-radius: 50px;
                    padding: 14px 33px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    transition: all 0.2s;
                }
                .cta-btn-secondary:hover {
                    transform: translateY(-3px);
                    background: white;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
                }
            `;
            parentDoc.head.appendChild(ctaStyle);
        }
        
        ctaContainer.innerHTML = `
            <div class="liquid-blob-fusion"></div>
            <div class="cta-glass-card">
                <h2 class="cta-title">Ready to Trust and Measure AI?</h2>
                <p class="cta-desc">Turn documents into verified insights and understand your AI search performance.</p>
                <div class="cta-button-container">
                    <button class="cta-btn-primary" id="btn-cta-start">&#128994; Start Free Trial</button>
                    <button class="cta-btn-secondary" id="btn-cta-demo">&#9898; Book Demo</button>
                </div>
            </div>
        `;
        
        claimHook.appendChild(ctaContainer);
        
        parentDoc.getElementById('btn-cta-start').addEventListener('click', () => {
            sessionStorage.setItem("startAnalysisClicked", "true");
            
            const uploader = parentDoc.querySelector('[data-testid="stFileUploader"]');
            if (uploader) uploader.style.display = 'block';
            const buttons = Array.from(parentDoc.querySelectorAll('[data-testid="baseButton-secondary"]'));
            const startBtn = buttons.find(b => b.innerText && b.innerText.includes("Start Processing"));
            if (startBtn) startBtn.style.display = 'inline-flex';
            
            if (uploader) {
                uploader.scrollIntoView({ behavior: 'smooth', block: 'center' });
                uploader.style.transition = 'box-shadow 0.5s';
                uploader.style.boxShadow = '0 0 20px 5px rgba(0,114,255,0.6)';
                setTimeout(() => { uploader.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.05)'; }, 1000);
            }
        });
        
        parentDoc.getElementById('btn-cta-demo').addEventListener('click', () => {
            alert("Demo booking system coming soon!");
        });
        
        // Inject Footer Section directly below Final CTA
        const footerContainer = parentDoc.createElement('div');
        footerContainer.id = 'custom-footer-ui';
        footerContainer.style.position = 'relative';
        footerContainer.style.width = '100%';
        footerContainer.style.marginTop = '80px';
        footerContainer.style.padding = '50px 20px 30px 20px';
        footerContainer.style.borderTop = '1px solid rgba(255, 255, 255, 0.4)';
        footerContainer.style.background = 'rgba(255, 255, 255, 0.2)';
        footerContainer.style.backdropFilter = 'blur(20px)';
        footerContainer.style.webkitBackdropFilter = 'blur(20px)';
        footerContainer.style.color = '#445566';
        footerContainer.style.fontSize = '15px';
        footerContainer.style.lineHeight = '1.6';
        
        footerContainer.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px; text-align: left;">
                <div style="flex: 1 1 250px;">
                    <h3 style="color: #1e3c72; font-size: 20px; margin-bottom: 15px; font-weight: 900; letter-spacing: -0.5px;">LLM CiteShield</h3>
                    <p style="font-weight: 500;">The definitive platform for verified AI claims, source traceability, and AI search ROI attribution.</p>
                </div>
                <div style="flex: 1 1 250px;">
                    <h3 style="color: #1e3c72; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: 800;">Contact Us</h3>
                    <p style="margin-bottom: 8px;">&#128231; <strong>Email:</strong> hello@llmciteshield.com</p>
                    <p>&#128222; <strong>Phone:</strong> +1 (800) 555-CITE</p>
                </div>
                <div style="flex: 1 1 250px;">
                    <h3 style="color: #1e3c72; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: 800;">Headquarters</h3>
                    <p>&#127970; <strong>LLM CiteShield Inc.</strong><br>100 Innovation Drive, Suite 400<br>San Francisco, CA 94105</p>
                </div>
            </div>
            <div style="margin-top: 50px; padding-top: 25px; border-top: 1px solid rgba(30, 60, 114, 0.1); text-align: center; font-weight: 600; font-size: 14px;">
                &copy; 2026 LLM CiteShield. All rights reserved.
            </div>
        `;
        
        claimHook.appendChild(footerContainer);
    }
    
    parentDoc.getElementById('btn-start-analysis').addEventListener('click', () => {
        sessionStorage.setItem("startAnalysisClicked", "true");
        
        // Show immediately
        const uploader = parentDoc.querySelector('[data-testid="stFileUploader"]');
        if (uploader) uploader.style.display = 'block';
        const buttons = Array.from(parentDoc.querySelectorAll('[data-testid="baseButton-secondary"]'));
        const startBtn = buttons.find(b => b.innerText && b.innerText.includes("Start Processing"));
        if (startBtn) startBtn.style.display = 'inline-flex';
        
        if (uploader) {
            uploader.scrollIntoView({ behavior: 'smooth', block: 'center' });
            uploader.style.transition = 'box-shadow 0.5s';
            uploader.style.boxShadow = '0 0 20px 5px rgba(0,114,255,0.6)';
            setTimeout(() => { uploader.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.05)'; }, 1000);
        }
    });
}
