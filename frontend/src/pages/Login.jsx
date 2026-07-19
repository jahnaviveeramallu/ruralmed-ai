import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!form.email) newErrors.email = 'Email is required'
    else if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email address'
    
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAlert(null)
    if (!validate()) {
      setAlert({ type: 'error', message: 'Please enter the correct information in all fields.' })
      return
    }

    setLoading(true)
    setTimeout(() => {
      const result = login(form.email, form.password)
      setLoading(false)

      if (result.success) {
        setAlert({ type: 'success', message: 'Login successful! Redirecting...' })
        setTimeout(() => navigate('/analyze'), 1000)
      } else {
        setAlert({ type: 'error', message: result.error })
      }
    }, 500)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    setAlert(null)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">
            <span className="auth-icon">🏥</span>
            <h1>RuralMed AI</h1>
            <p>Smart Triage for India's Health Warriors</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature">✓ AI-powered symptom analysis</div>
            <div className="auth-feature">✓ Instant risk assessment</div>
            <div className="auth-feature">✓ Patient history tracking</div>
            <div className="auth-feature">✓ Works on any device</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrapper">
            <h2>Welcome Back 👋</h2>
            <p className="auth-subtitle">Login to continue helping patients</p>

            {alert && (
              <div className={`auth-alert alert-${alert.type}`}>
                {alert.type === 'error' ? '⚠️' : '✅'} {alert.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login →'}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Create one here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}