import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">🏥 RuralMed AI</span>
          <p>AI-powered triage support for rural health workers across India. Built with ❤️ for saving lives.</p>
        </div>

        <div className="footer-links">
          <strong>Quick Links</strong>
          <Link to="/">Home</Link>
          <Link to="/analyze">Analyze</Link>
          <Link to="/about">About</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <div className="footer-emergency">
          <strong>Emergency Numbers</strong>
          <a href="tel:108">🚨 108 — Ambulance</a>
          <a href="tel:104">🏥 104 — Health Helpline</a>
          <a href="tel:112">🚔 112 — National Emergency</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>⚠️ RuralMed AI is a decision-support tool only. It does not replace qualified medical diagnosis. Always consult a doctor for final decisions.</p>
        <p>Built for NxtWave Hackathon 2025 · © RuralMed AI</p>
      </div>
    </footer>
  )
}