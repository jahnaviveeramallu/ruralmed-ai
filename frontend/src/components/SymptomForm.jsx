import React, { useState } from 'react'
import '../styles/Form.css'

const DURATION_OPTIONS = [
  'Less than 6 hours',
  '6-12 hours',
  '12-24 hours',
  '1-2 days',
  '3-5 days',
  '5-7 days',
  '1-2 weeks',
  '2-4 weeks',
  'More than 1 month',
  'Chronic (ongoing)'
]

const SEVERITY_OPTIONS = [
  { value: 'mild', label: 'Mild - Uncomfortable but active' },
  { value: 'moderate', label: 'Moderate - Weak and in pain' },
  { value: 'severe', label: 'Severe - Cannot do daily activities' },
  { value: 'critical', label: 'Critical - Serious condition' }
]

export default function SymptomForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: '', gender: '', symptoms: '', duration: '', severity: '', language: 'english'
  })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState(null)

  const validate = () => {
    const newErrors = {}
    if (!form.age) newErrors.age = 'Age is required'
    else if (form.age <= 0 || form.age > 120) newErrors.age = 'Please enter a valid age (1-120)'
    if (!form.gender) newErrors.gender = 'Please select gender'
    if (!form.symptoms) newErrors.symptoms = 'Symptoms description is required'
    else if (form.symptoms.trim().length < 10) newErrors.symptoms = 'Please describe symptoms in at least 10 characters'
    if (!form.duration) newErrors.duration = 'Please select duration'
    if (!form.severity) newErrors.severity = 'Please select severity level'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
    setAlert(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAlert(null)
    if (!validate()) {
      setAlert('Please enter the correct information in all required fields.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    onSubmit({ ...form, age: parseInt(form.age) })
  }

  const handleReset = () => {
    setForm({ age: '', gender: '', symptoms: '', duration: '', severity: '', language: 'english' })
    setErrors({})
    setAlert(null)
  }

  return (
    <form className="symptom-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Patient Symptom Entry</h2>
        <p>Fill all fields carefully for accurate AI analysis</p>
      </div>

      {alert && <div className="form-alert">{alert}</div>}

      <div className="form-group language-toggle">
        <label>Response Language</label>
        <div className="toggle-buttons">
          <button type="button" className={`toggle-btn ${form.language === 'english' ? 'active' : ''}`} onClick={() => setForm({ ...form, language: 'english' })}>English</button>
          <button type="button" className={`toggle-btn ${form.language === 'hindi' ? 'active' : ''}`} onClick={() => setForm({ ...form, language: 'hindi' })}>Hindi</button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Patient Age *</label>
          <input type="number" name="age" placeholder="Enter age (1-120)" value={form.age} onChange={handleChange} className={errors.age ? 'input-error' : ''} min="1" max="120" />
          {errors.age && <span className="error-msg">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label>Gender *</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={errors.gender ? 'input-error' : ''}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error-msg">{errors.gender}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Symptoms Description *</label>
        <textarea name="symptoms" placeholder="Example: High fever since 2 days, severe headache, body pain, vomited twice, no appetite" value={form.symptoms} onChange={handleChange} className={errors.symptoms ? 'input-error' : ''} rows="5" />
        <span className="char-count">{form.symptoms.length} characters</span>
        {errors.symptoms && <span className="error-msg">{errors.symptoms}</span>}
      </div>

      <div className="form-group">
        <label>Duration of Symptoms *</label>
        <select name="duration" value={form.duration} onChange={handleChange} className={errors.duration ? 'input-error' : ''}>
          <option value="">Select duration</option>
          {DURATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {errors.duration && <span className="error-msg">{errors.duration}</span>}
      </div>

      <div className="form-group">
        <label>Severity Level *</label>
        <div className="severity-list">
          {SEVERITY_OPTIONS.map(opt => (
            <label key={opt.value} className={`severity-card ${form.severity === opt.value ? 'selected' : ''}`}>
              <input type="radio" name="severity" value={opt.value} checked={form.severity === opt.value} onChange={handleChange} hidden />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.severity && <span className="error-msg">{errors.severity}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-reset" onClick={handleReset}>Clear</button>
        <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Symptoms'}</button>
      </div>
    </form>
  )
}