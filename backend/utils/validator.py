def validate_input(data):
    errors = []

    if not data.age or data.age <= 0 or data.age > 120:
        errors.append("Please enter a valid age between 1 and 120.")

    if not data.gender or data.gender not in ["male", "female", "other"]:
        errors.append("Please select a valid gender.")

    if not data.symptoms or len(data.symptoms.strip()) < 5:
        errors.append("Please describe the symptoms in more detail.")

    if not data.duration:
        errors.append("Please select the duration of symptoms.")

    if not data.severity:
        errors.append("Please select the severity level.")

    return errors