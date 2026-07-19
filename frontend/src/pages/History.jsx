import React, { useState, useEffect } from 'react'
import '../styles/History.css'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ruralmed_history') || '[]')
    setHistory(saved)
  }, [])

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <div className="empty-icon">📋</div>
        <h2>No Records Yet</h2>
        <p>Saved analyses will appear here.</p>
      </div>
    )
  }

  return (
    <div className="history-page">
      <h1>📋 Patient History</h1>
      {history.map((record, i) => (
        <div key={i} className="history-card">
          <strong>{record.patient.age} yrs, {record.patient.gender}</strong>
          <p>{record.patient.symptoms}</p>
          <span>Risk: {record.analysis.risk_level}</span>
        </div>
      ))}
    </div>
  )
}