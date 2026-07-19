import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SymptomForm from '../components/SymptomForm'
import ResultCard from '../components/ResultCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeSymptoms } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/Analyze.css'

export default function Analyze() {
  const navigate = useNavigate()
  const { user, saveAnalysis } = useAuth()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [patientData, setPatientData] = useState(null)
  const [saved, setSaved] = useState(false)
  const resultRef = useRef(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setResult(null)
    setError(null)
    setSaved(false)
    setPatientData(formData)

    const response = await analyzeSymptoms(formData)
    setLoading(false)

    if (response.success) {
      setResult(response.data)
      
      // Auto-save to user account
      saveAnalysis({
        patient: formData,
        analysis: response.data.analysis
      })
      setSaved(true)

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      setError(response.error)
    }
  }

  const handleNewAnalysis = () => {
    setResult(null)
    setError(null)
    setPatientData(null)
    setSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="analyze-page">
      <div className="analyze-header">
        <div className="analyze-welcome">
          👋 Welcome, <strong>{user?.name}</strong>
        </div>
        <h1>🩺 Patient Symptom Analysis</h1>
        <p>Enter accurate patient details for the best AI triage decision.</p>
        <div className="analyze-notice">
          💡 <span>More detail in symptoms = more accurate AI analysis</span>
        </div>
      </div>

      <div className="analyze-container">
        <SymptomForm onSubmit={handleSubmit} loading={loading} />
        
        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <div className="error-box">
            <span className="error-icon">❌</span>
            <div>
              <strong>Analysis Failed</strong>
              <p>{error}</p>
              <button onClick={handleNewAnalysis} className="btn-retry">Try Again</button>
            </div>
          </div>
        )}
        
        {result && !loading && (
          <div ref={resultRef}>
            {saved && (
              <div className="save-badge">
                ✅ Analysis auto-saved to your profile
              </div>
            )}
            <ResultCard result={result} patient={patientData} />
            <div className="post-actions">
              <button className="btn-new-analysis" onClick={handleNewAnalysis}>
                🔄 Analyze Another Patient
              </button>
              <button className="btn-view-history" onClick={() => navigate('/profile')}>
                📋 View All History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}