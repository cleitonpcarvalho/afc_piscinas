import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('afc_token')
    const stored = localStorage.getItem('afc_user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  async function login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('afc_token', data.token)
    localStorage.setItem('afc_user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  function logout() {
    localStorage.removeItem('afc_token')
    localStorage.removeItem('afc_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
