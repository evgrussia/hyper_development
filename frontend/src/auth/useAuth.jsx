import { useState, useEffect, useCallback } from 'react'
import { getStoredTokens, setStoredTokens, clearStoredTokens, getAccessToken } from '../api/client'

export function useAuth() {
  const [tokens, setTokens] = useState(getStoredTokens())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTokens(getStoredTokens())
    setLoading(false)
  }, [])

  const login = useCallback((newTokens) => {
    setStoredTokens(newTokens)
    setTokens(newTokens)
  }, [])

  const logout = useCallback(() => {
    clearStoredTokens()
    setTokens(null)
  }, [])

  const isAuthenticated = Boolean(tokens?.access ?? getAccessToken())

  return { tokens, isAuthenticated, loading, login, logout }
}
