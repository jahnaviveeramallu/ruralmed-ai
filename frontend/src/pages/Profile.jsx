import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout, getUserHistory, clearUserHistory } = useAuth()
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getUserHistory())
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  const handleClearHistory = () => {
    if (confirm('Delete all your analysis history? This cannot be undone.')) {
      clearUserHistory()
      setHistory([])
    }
  }

  const stats = {
    total: history.length,
    high: history.filter(h => h.analysis.risk_level === 'HIGH').length,
    medium: history.filter(h => h.analysis.risk_level === 'MEDIUM').length,
    low: history.filter(h => h.analysis.risk_level === 'LOW').length
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <span className="stat-num">{stats.total}</span>
          <span className="stat-lbl">Total Analyses</span>
        </div>
        <div className="stat-box stat-high">
          <span className="stat-num">{stats.high}</span>
          <span className="stat-lbl">🔴 High Risk</span>
        </div>
        <div className="stat-box stat-med">
          <span className="stat-num">{stats.medium}</span>
          <span className="stat-lbl">🟡 Medium Risk</span>
        </div>
        <div className="stat-box stat-low">
          <span className="stat-num">{stats.low}</span>
          <span className="stat-lbl">🟢 Low Risk</span>
        </div>
      </div>

      <div className="profile-history-section">
        <div className="history-title-row">
          <h2>📋 Your Analysis History</h2>
          {history.length > 0 && (
            <button className="btn-clear-all" onClick={handleClearHistory}>
              🗑️ Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">📭</div>
            <h3>No Analyses Yet</h3>
            <p>Start analyzing patient symptoms and your history will appear here automatically.</p>
            <button className="btn-start" onClick={() => navigate('/analyze')}>
              🔍 Start First Analysis
            </button>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((record) => (
              <div key={record.id} className="history-item">
                <div className="history-top">
                  <span className={`risk-tag risk-${record.analysis.risk_level.toLowerCase()}`}>
                    {record.analysis.risk_level}
                  </span>
                  <span className="history-date">
                    {new Date(record.timestamp).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="history-body">
                  <p className="history-patient">
                    👤 {record.patient.age} yrs • {record.patient.gender}
                  </p>
                  <p className="history-symptoms">{record.patient.symptoms}</p>
                  <p className="history-cond">
                    🔬 <strong>{record.analysis.possible_condition}</strong>
                  </p>
                  <p className={`history-ref ${record.analysis.refer_to_hospital ? 'ref-yes' : 'ref-no'}`}>
                    {record.analysis.refer_to_hospital ? '🏥 Referred to Hospital' : '🏠 Home Care'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}