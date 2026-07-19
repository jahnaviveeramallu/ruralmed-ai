from fastapi import APIRouter, HTTPException
from models.schemas import SymptomInput
from services.ai_engine import analyze_symptoms
from utils.validator import validate_input

router = APIRouter()

@router.post("/analyze")
async def analyze(data: SymptomInput):
    errors = validate_input(data)
    if errors:
        raise HTTPException(status_code=422, detail=errors)

    result = analyze_symptoms(data)

    return {
        "status": "success",
        "patient": {
            "age": data.age,
            "gender": data.gender,
            "symptoms": data.symptoms,
            "duration": data.duration,
            "severity": data.severity
        },
        "analysis": result
    }

@router.get("/health")
async def health_check():
    return {
        "status": "RuralMed AI is running",
        "version": "1.0.0"
    }