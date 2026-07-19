import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Header.css'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏥</span>
          <div className="logo-text">
            <span className="logo-name">RuralMed AI</span>
            <span className="logo-tagline">Smart Triage Assistant</span>
          </div>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/analyze" className={`nav-link ${location.pathname === '/analyze' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Analyze</Link>
          
          {user && (
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>History</Link>
          )}
          
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
          
          {user ? (
            <div className="user-menu">
              <button 
                className="user-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name.split(' ')[0]}</span>
                <span className="dropdown-arrow">▾</span>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    👤 My Profile
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    📋 History
                  </Link>
                  <Link to="/analyze" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    🔍 New Analysis
                  </Link>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="nav-cta" onClick={() => setMenuOpen(false)}>Sign Up Free</Link>
            </>
          )}
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}