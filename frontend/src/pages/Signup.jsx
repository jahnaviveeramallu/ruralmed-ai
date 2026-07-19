import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', confirmPassword: '' 
  })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!form.name || form.name.trim().length < 2)
      newErrors.name = 'Please enter your full name (at least 2 characters)'
    
    if (!form.email) newErrors.email = 'Email is required'
    else if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email address'
    
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match'
    
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
      const result = signup(form.name.trim(), form.email, form.password)
      setLoading(false)

      if (result.success) {
        setAlert({ type: 'success', message: 'Account created successfully! Redirecting...' })
        setTimeout(() => navigate('/analyze'), 1000)
      } else {
        setAlert({ type: 'warning', message: result.error })
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
            <h1>Join RuralMed AI</h1>
            <p>Start Saving Lives with AI</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature">🚀 Free forever for health workers</div>
            <div className="auth-feature">🔒 Your data stays private</div>
            <div className="auth-feature">🌍 Trusted across rural India</div>
            <div className="auth-feature">⚡ Instant setup, no training needed</div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrapper">
            <h2>Create Your Account 🎉</h2>
            <p className="auth-subtitle">Join thousands of health workers</p>

            {alert && (
              <div className={`auth-alert alert-${alert.type}`}>
                {alert.type === 'error' ? '⚠️' : alert.type === 'warning' ? '🔔' : '✅'} {alert.message}
                {alert.type === 'warning' && (
                  <Link to="/login" className="alert-link"> → Go to Login</Link>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

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
                  placeholder="Create a strong password (min 6 chars)"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}