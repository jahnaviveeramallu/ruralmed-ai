import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-badge">Our Mission</div>
        <h1>Bridging India's Rural Healthcare Gap with AI</h1>
        <p>
          RuralMed AI is a mission-driven project built to help India's 600,000+ ASHA workers
          save more lives through intelligent, accessible AI-powered triage decisions.
        </p>
      </section>

      <section className="about-section problem-section">
        <div className="section-tag">THE PROBLEM</div>
        <h2>India's Silent Healthcare Crisis</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="problem-num">1:11,000</span>
            <p>Doctor-to-patient ratio in rural India (WHO recommends 1:1,000)</p>
          </div>
          <div className="problem-card">
            <span className="problem-num">65%</span>
            <p>Of India lives in rural areas with less than 30% of qualified doctors</p>
          </div>
          <div className="problem-card">
            <span className="problem-num">80%</span>
            <p>Of rural deaths are from 5 preventable diseases like Malaria and TB</p>
          </div>
          <div className="problem-card">
            <span className="problem-num">2000 INR</span>
            <p>Average monthly earning of ASHA workers with zero diagnostic tools</p>
          </div>
        </div>
        <p className="problem-summary">
          Every day, ASHA workers visit homes handling critically ill patients with
          no clinical training and no decision-support tools. They must decide whether to
          send a patient home or arrange emergency transport - often getting it wrong,
          costing precious lives.
        </p>
      </section>

      <section className="about-section solution-section">
        <div className="section-tag">OUR SOLUTION</div>
        <h2>AI That Works Where Doctors Cannot Reach</h2>
        <p className="solution-desc">
          RuralMed AI is a simple, AI-powered symptom triage tool designed specifically
          for rural health workers. It takes basic patient information, analyzes symptoms
          using advanced Natural Language Processing (GPT-3.5), and gives a clear,
          actionable triage decision in seconds.
        </p>

        <div className="solution-features">
          <div className="solution-feature">
            <span>1</span>
            <div>
              <h4>Rural-First Design</h4>
              <p>Built for basic smartphones, works on slow networks, simple UI</p>
            </div>
          </div>
          <div className="solution-feature">
            <span>2</span>
            <div>
              <h4>AI Plus Safety Layer</h4>
              <p>GPT-3.5 analysis combined with rule-based safety checks for critical symptoms</p>
            </div>
          </div>
          <div className="solution-feature">
            <span>3</span>
            <div>
              <h4>Indian Context</h4>
              <p>Trained to recognize diseases common in rural India: Malaria, Dengue, TB, Typhoid</p>
            </div>
          </div>
          <div className="solution-feature">
            <span>4</span>
            <div>
              <h4>Clear Decisions</h4>
              <p>LOW / MEDIUM / HIGH risk with actionable steps and referral guidance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section tech-section">
        <div className="section-tag">TECHNOLOGY</div>
        <h2>Built with Modern, Reliable Tech</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">R</span>
            <div>
              <strong>React.js + Vite</strong>
              <p>Fast, modern frontend framework</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">P</span>
            <div>
              <strong>Python FastAPI</strong>
              <p>High-performance async backend</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">AI</span>
            <div>
              <strong>OpenAI GPT-3.5</strong>
              <p>Advanced language AI for medical reasoning</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">S</span>
            <div>
              <strong>Safety Classifier</strong>
              <p>Custom rule-based layer for critical keywords</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">C</span>
            <div>
              <strong>Vercel + Render</strong>
              <p>Reliable cloud deployment infrastructure</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">L</span>
            <div>
              <strong>Local Storage</strong>
              <p>Patient data stays on device - private by design</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section impact-section">
        <div className="section-tag">IMPACT</div>
        <h2>Making a Real Difference</h2>
        <div className="impact-grid">
          <div className="impact-box">
            <span className="impact-icon">1</span>
            <h3>Faster Decisions</h3>
            <p>Triage decisions in 10 seconds instead of hours of uncertainty</p>
          </div>
          <div className="impact-box">
            <span className="impact-icon">2</span>
            <h3>Accurate Referrals</h3>
            <p>Right patients referred at the right time - reduces overcrowded hospitals</p>
          </div>
          <div className="impact-box">
            <span className="impact-icon">3</span>
            <h3>Massive Scale</h3>
            <p>Accessible to all 600,000 ASHA workers with zero training needed</p>
          </div>
          <div className="impact-box">
            <span className="impact-icon">4</span>
            <h3>Zero Cost</h3>
            <p>Free forever for health workers - no subscription, no hidden fees</p>
          </div>
        </div>
      </section>

      <section className="about-section mission-section">
        <div className="section-tag">MISSION</div>
        <h2>Why We Built This</h2>
        <p className="mission-text">
          Healthcare should not be a luxury based on where you were born. Every day,
          rural families lose loved ones to conditions that could have been treated
          if identified in time. We built RuralMed AI to put the power of clinical
          decision-making into the hands of every health worker in India - because
          <strong> every life matters, no matter where they live.</strong>
        </p>
      </section>

      <section className="about-section disclaimer-section">
        <div className="section-tag">IMPORTANT DISCLAIMER</div>
        <p>
          RuralMed AI is a <strong>clinical decision-support tool only</strong>.
          It is NOT a replacement for qualified medical diagnosis or treatment.
          Health workers must always use their judgment and consult a qualified
          doctor for final medical decisions. In any emergency, call <strong>108</strong> immediately.
        </p>
      </section>

      <section className="about-cta">
        <h2>Ready to Save Lives?</h2>
        <div className="about-cta-buttons">
          <Link to="/signup" className="btn-primary">Get Started Free</Link>
          <Link to="/analyze" className="btn-secondary">Try Analysis</Link>
        </div>
      </section>
    </div>
  )
}