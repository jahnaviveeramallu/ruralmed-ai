
# RuralMed AI

**AI-Powered Symptom Triage Assistant for Rural Health Workers in India**

Live App: https://ruralmed-ai.vercel.app
Backend API: https://ruralmed-ai-production.up.railway.app

## Problem

Over 600,000 ASHA workers in rural India handle critically ill patients daily with zero clinical decision support tools. They cannot identify serious conditions or know when to refer patients to hospital, leading to preventable deaths every day.

## Solution

RuralMed AI is a web-based AI application that helps rural health workers make faster, confident patient care decisions. Enter patient symptoms and get instant AI triage decision with risk level, condition, first aid steps, and hospital referral guidance.

## Key Features

- Secure signup and login with duplicate email detection
- Google Gemini AI-powered symptom analysis
- LOW / MEDIUM / HIGH risk classification
- Symptom-specific first aid steps
- Clear hospital referral YES/NO decision
- Auto-save analysis to user profile
- Bilingual support (English and Hindi)
- Custom safety classifier for critical keywords
- Fully responsive, works on any browser

## Tech Stack

- Frontend: React.js + Vite
- Backend: Python + FastAPI
- AI: Google Gemini (gemini-flash-latest)
- Auth: React Context + LocalStorage
- Deploy Frontend: Vercel
- Deploy Backend: Railway

## Local Setup

### Prerequisites

- Node.js 18 or higher
- Python 3.10 or higher
- Google Gemini API Key from https://aistudio.google.com/apikey

### 1. Clone Repository

    git clone https://github.com/jahnaviveeramallu/ruralmed-ai.git
    cd ruralmed-ai

### 2. Setup Backend

    cd backend
    pip install -r requirements.txt

Create .env file in backend folder:

    GEMINI_API_KEY=your_gemini_api_key_here

Run backend:

    python -m uvicorn main:app --reload

Backend runs at http://localhost:8000

### 3. Setup Frontend

    cd frontend
    npm install
    npm run dev

Frontend runs at http://localhost:5173

### 4. Open in Browser

Visit http://localhost:5173 and start using RuralMed AI

## Project Structure

    ruralmed-ai/
    ├── backend/
    │   ├── main.py
    │   ├── config.py
    │   ├── requirements.txt
    │   ├── routes/analyze.py
    │   ├── services/ai_engine.py
    │   ├── services/prompt_builder.py
    │   ├── services/risk_classifier.py
    │   ├── models/schemas.py
    │   └── utils/validator.py
    ├── frontend/
    │   ├── src/components/
    │   ├── src/pages/
    │   ├── src/context/
    │   ├── src/services/
    │   └── src/styles/
    └── README.md

## How AI Works

1. Health worker enters patient symptoms
2. Backend builds structured medical prompt with Indian rural disease context
3. Google Gemini AI analyzes symptoms and returns JSON with risk assessment
4. Custom safety classifier reviews output - overrides to HIGH risk if critical keywords detected
5. Result displayed with first aid steps and referral decision
6. Analysis auto-saved to user profile

## Disclaimer

RuralMed AI is a clinical decision-support tool only. It does NOT replace qualified medical diagnosis. Always consult a qualified doctor for final medical decisions. In emergency call 108 immediately.

## Author

Jahnavi Veeramallu
GitHub: https://github.com/jahnaviveeramallu

## Hackathon

Built for NxtWave Hackathon 2025 - Theme: Crisis Management, HealthTech & Emergency Response
