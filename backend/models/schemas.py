from pydantic import BaseModel
from typing import Optional

class SymptomInput(BaseModel):
    age: int
    gender: str
    symptoms: str
    duration: str
    severity: str
    language: Optional[str] = "english"

class TriageResult(BaseModel):
    risk_level: str
    possible_condition: str
    first_aid_steps: list[str]
    refer_to_hospital: bool
    refer_message: str
    emergency_note: str
    disclaimer: str