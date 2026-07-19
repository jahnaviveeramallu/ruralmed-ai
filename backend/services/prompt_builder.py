def build_prompt(data, language="english"):
    lang_instruction = ""
    if language == "hindi":
        lang_instruction = "Write all text values in simple Hindi language."
    else:
        lang_instruction = "Write all text values in simple English."

    prompt = f"""You are a medical triage AI for rural India health workers.

PATIENT:
- Age: {data.age} years
- Gender: {data.gender}
- Symptoms: {data.symptoms}
- Duration: {data.duration}
- Severity: {data.severity}

TASK: Analyze and respond with ONLY valid JSON. No thinking. No explanation. No markdown. Just JSON.

REQUIRED JSON FORMAT (respond with exactly this structure):
{{
  "risk_level": "LOW",
  "possible_condition": "specific disease name based on symptoms",
  "first_aid_steps": [
    "specific action 1 based on symptoms",
    "specific action 2 based on symptoms",
    "specific action 3 based on symptoms",
    "specific action 4 based on symptoms"
  ],
  "refer_to_hospital": true,
  "refer_message": "what to tell the doctor OR what to monitor at home",
  "emergency_note": "urgent warning signs to watch for",
  "disclaimer": "AI decision support only"
}}

RISK RULES:
- HIGH: chest pain, difficulty breathing, unconscious, severe bleeding, seizures, severe dehydration, snake bite, high fever in infant, pregnancy complications
- MEDIUM: fever 3+ days, persistent vomiting, moderate pain, worsening symptoms, elderly with multiple symptoms
- LOW: mild fever under 2 days, common cold, minor pain, improving symptoms

INDIAN DISEASES TO CONSIDER: Malaria, Dengue, Typhoid, TB, Diarrhea, Pneumonia, Anemia, Snake bite, Heat stroke

{lang_instruction}

IMPORTANT: Give SPECIFIC condition name (not "consult doctor"). Give SPECIFIC first aid steps based on the actual symptoms provided.

Output ONLY the JSON object. Start with {{ and end with }}. No other text."""

    return prompt