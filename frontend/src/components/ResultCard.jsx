import React from 'react'
import RiskBadge from './RiskBadge'
import '../styles/ResultCard.css'

export default function ResultCard({ result, patient }) {
  const { analysis } = result
  return (
    <div className="result-card">
      <div className="result-header"><h2>🩺 Analysis Result</h2></div>
      <RiskBadge level={analysis.risk_level} />
      <div className="result-section">
        <h3>🔬 Possible Condition</h3>
        <p className="condition-text">{analysis.possible_condition}</p>
      </div>
      <div className={`referral-box ${analysis.refer_to_hospital ? 'refer-yes' : 'refer-no'}`}>
        <h3>{analysis.refer_to_hospital ? 'REFER TO HOSPITAL: YES' : 'HOME CARE: YES'}</h3>
        <p>{analysis.refer_message}</p>
      </div>
      <div className="result-section">
        <h3>🩹 Steps</h3>
        <ul>{analysis.first_aid_steps.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
      <p className="disclaimer">{analysis.disclaimer}</p>
    </div>
  )
}