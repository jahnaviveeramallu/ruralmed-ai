from google import genai
from google.genai import types
import json
import re
from config import GEMINI_API_KEY, MODEL_NAME
from services.prompt_builder import build_prompt
from services.risk_classifier import classify_risk

client = genai.Client(api_key=GEMINI_API_KEY)

def analyze_symptoms(data):
    try:
        prompt = build_prompt(data, data.language)

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                max_output_tokens=2000,
                response_mime_type="application/json"
            )
        )

        raw_response = response.text.strip()
        print(f"Gemini Raw Response: {raw_response[:500]}")

        # Try direct JSON parse first
        try:
            result = json.loads(raw_response)
        except json.JSONDecodeError:
            # Fallback: extract JSON block
            json_match = re.search(r'\{[\s\S]*\}', raw_response)
            if json_match:
                result = json.loads(json_match.group())
            else:
                raise ValueError("No JSON found in AI response")

        # Ensure all required fields exist
        result.setdefault("risk_level", "MEDIUM")
        result.setdefault("possible_condition", "Symptoms require further evaluation")
        result.setdefault("first_aid_steps", ["Consult a doctor immediately"])
        result.setdefault("refer_to_hospital", True)
        result.setdefault("refer_message", "Please consult a qualified doctor")
        result.setdefault("emergency_note", "Call 108 in emergency")

        # Apply safety classifier
        original_risk = result.get("risk_level", "MEDIUM")
        safe_risk = classify_risk(data.symptoms, original_risk)
        result["risk_level"] = safe_risk

        if safe_risk == "HIGH":
            result["refer_to_hospital"] = True

        result["disclaimer"] = (
            "This AI tool supports decision-making only. "
            "It does NOT replace a qualified doctor. "
            "In emergency call 108 immediately."
        )

        return result

    except Exception as e:
        print(f"AI Engine Error: {e}")
        return get_fallback_response()


def get_fallback_response():
    return {
        "risk_level": "MEDIUM",
        "possible_condition": "Unable to analyze - please consult a doctor",
        "first_aid_steps": [
            "Keep the patient calm and rested",
            "Ensure patient drinks clean water",
            "Monitor temperature every 2 hours",
            "If condition worsens, go to nearest PHC immediately"
        ],
        "refer_to_hospital": True,
        "refer_message": "AI analysis failed. Please refer patient to nearest PHC.",
        "emergency_note": "If patient shows breathing difficulty, chest pain, or loses consciousness - call 108 immediately.",
        "disclaimer": "In emergency call 108 immediately."
    }