CRITICAL_KEYWORDS = [
    "unconscious", "not breathing", "chest pain",
    "heart attack", "stroke", "seizure", "convulsion",
    "heavy bleeding", "blood vomiting", "snake bite",
    "not responding", "difficulty breathing", "breathless",
    "severe headache", "neck stiffness", "no pulse",
    "pregnancy bleeding", "baby not moving", "premature labor",
    "blue lips", "blue skin", "choking", "poisoning",
    "suicide", "self harm", "hanging", "drowning"
]

MEDIUM_KEYWORDS = [
    "high fever", "fever 3 days", "vomiting",
    "diarrhea", "dehydration", "not eating",
    "very weak", "cannot walk", "swollen",
    "yellow eyes", "yellow skin", "jaundice",
    "burning urine", "blood in urine"
]

def classify_risk(symptoms: str, ai_risk: str) -> str:
    symptoms_lower = symptoms.lower()

    for keyword in CRITICAL_KEYWORDS:
        if keyword in symptoms_lower:
            return "HIGH"

    for keyword in MEDIUM_KEYWORDS:
        if keyword in symptoms_lower:
            if ai_risk == "LOW":
                return "MEDIUM"

    return ai_risk