import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Home.css'

const STATS = [
  { number: '600K+', label: 'ASHA Workers', icon: '👥' },
  { number: '500M+', label: 'Rural Citizens', icon: '🌾' },
  { number: '1:11K', label: 'Doctor Ratio', icon: '⚕️' },
  { number: '80%', label: 'Preventable Deaths', icon: '💔' }
]

const FEATURES = [
  { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Advanced Gemini AI analyzes symptoms in seconds with rural India context.' },
  { icon: '⚡', title: 'Instant Triage', desc: 'Get risk level, condition, and referral decision in less than 10 seconds.' },
  { icon: '🏥', title: 'Hospital Referral', desc: 'Clear YES/NO decision on whether patient needs immediate hospital care.' },
  { icon: '📋', title: 'Auto History', desc: 'All patient analyses automatically saved to your account for follow-ups.' },
  { icon: '🌐', title: 'Works Anywhere', desc: 'Runs on any smartphone or basic browser. No app installation required.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Patient data stays on your device. Fully privacy-conscious design.' }
]

const HOW_IT_WORKS = [
  { step: '01', icon: '📝', title: 'Enter Symptoms', desc: 'Fill in patient age, gender, symptoms, and duration in simple form' },
  { step: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Gemini AI processes symptoms against Indian disease patterns instantly' },
  { step: '03', icon: '✅', title: 'Get Decision', desc: 'Receive risk level, first aid steps, and referral advice in seconds' }
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🇮🇳 Built for Rural India • AI Powered</div>
          <h1>
            Save Lives with
            <span className="hero-highlight"> AI-Powered Triage</span>
          </h1>
          <p className="hero-desc">
            RuralMed AI helps ASHA workers and village health workers make
            confident decisions about patient care — identifying critical cases
            and knowing exactly when to refer to a hospital.
          </p>
          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/analyze" className="btn-primary btn-large">
                  🔍 Start New Analysis
                </Link>
                <Link to="/profile" className="btn-secondary btn-large">
                  📋 View History
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn-primary btn-large">
                  🚀 Get Started Free
                </Link>
                <Link to="/login" className="btn-secondary btn-large">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card floating">
            <div className="hero-card-header">
              <span className="risk-dot red"></span>
              <span>HIGH RISK — Refer Immediately</span>
            </div>
            <p className="hero-card-patient">👤 45yr Male • Fever 4 days • Severe headache</p>
            <div className="hero-card-result">
              <strong>🔬 Possible: Dengue / Typhoid</strong>
              <span>🏥 Refer to hospital: YES</span>
            </div>
            <div className="hero-card-steps">
              <span>✓ Give ORS immediately</span>
              <span>✓ Monitor breathing</span>
              <span>✓ Arrange transport</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="section-header">
          <h2>The Problem is Real</h2>
          <p>India's rural healthcare gap in numbers</p>
        </div>
        <div className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why RuralMed AI?</h2>
          <p>Built specifically for the reality of rural India</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to smarter triage decisions</p>
        </div>
        <div className="steps-grid">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="step-card">
              <div className="step-num">{item.step}</div>
              <div className="step-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Save Lives?</h2>
        <p>Join thousands of health workers using RuralMed AI</p>
        {user ? (
          <Link to="/analyze" className="btn-white btn-large">
            🔍 Start Analysis Now
          </Link>
        ) : (
          <Link to="/signup" className="btn-white btn-large">
            🚀 Create Free Account
          </Link>
        )}
      </section>
    </div>
  )
}