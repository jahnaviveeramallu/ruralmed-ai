from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router
from config import APP_NAME, VERSION

app = FastAPI(
    title=APP_NAME,
    version=VERSION,
    description="AI-Powered Symptom Triage Assistant for Rural Health Workers"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to RuralMed AI",
        "version": VERSION,
        "status": "running",
        "docs": "/docs"
    }