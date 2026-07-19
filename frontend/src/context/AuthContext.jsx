import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('ruralmed_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('ruralmed_users') || '[]')
    
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return { 
        success: false, 
        error: 'An account with this email already exists. Please login instead.' 
      }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
      history: []
    }

    users.push(newUser)
    localStorage.setItem('ruralmed_users', JSON.stringify(users))
    
    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email }
    localStorage.setItem('ruralmed_user', JSON.stringify(userSession))
    setUser(userSession)

    return { success: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ruralmed_users') || '[]')
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!foundUser) {
      const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (emailExists) {
        return { success: false, error: 'Incorrect password. Please try again.' }
      }
      return { success: false, error: 'No account found with this email. Please signup first.' }
    }

    const userSession = { id: foundUser.id, name: foundUser.name, email: foundUser.email }
    localStorage.setItem('ruralmed_user', JSON.stringify(userSession))
    setUser(userSession)

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('ruralmed_user')
    setUser(null)
  }

  const saveAnalysis = (analysisRecord) => {
    if (!user) return

    const users = JSON.parse(localStorage.getItem('ruralmed_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    
    if (userIndex !== -1) {
      if (!users[userIndex].history) users[userIndex].history = []
      users[userIndex].history.unshift({
        ...analysisRecord,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      })
      users[userIndex].history = users[userIndex].history.slice(0, 50)
      localStorage.setItem('ruralmed_users', JSON.stringify(users))
    }
  }

  const getUserHistory = () => {
    if (!user) return []
    const users = JSON.parse(localStorage.getItem('ruralmed_users') || '[]')
    const currentUser = users.find(u => u.id === user.id)
    return currentUser?.history || []
  }

  const clearUserHistory = () => {
    if (!user) return
    const users = JSON.parse(localStorage.getItem('ruralmed_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].history = []
      localStorage.setItem('ruralmed_users', JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, loading, signup, login, logout, 
      saveAnalysis, getUserHistory, clearUserHistory 
    }}>
      {children}
    </AuthContext.Provider>
  )
}