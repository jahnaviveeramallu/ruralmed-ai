import React from 'react'
import '../styles/RiskBadge.css'

export default function RiskBadge({ level }) {
  const colors = { HIGH: '#dc2626', MEDIUM: '#d97706', LOW: '#16a34a' }
  return (
    <div className="risk-badge" style={{ borderLeft: `8px solid ${colors[level]}` }}>
      <span className="risk-label" style={{ color: colors[level] }}>{level} RISK</span>
    </div>
  )
}