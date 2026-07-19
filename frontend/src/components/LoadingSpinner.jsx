import React from 'react'
import '../styles/LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h3>AI is Analyzing...</h3>
    </div>
  )
}