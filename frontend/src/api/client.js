const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export const getStoredTokens = () => {
  try {
    const raw = localStorage.getItem('auth_tokens')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setStoredTokens = (tokens) => {
  if (tokens?.access) {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens))
  }
}

export const clearStoredTokens = () => {
  localStorage.removeItem('auth_tokens')
}

export const getAccessToken = () => getStoredTokens()?.access ?? null

export async function apiRequest(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(url, { ...options, headers, credentials: 'include' })
  if (!res.ok) {
    const err = new Error(res.statusText)
    err.status = res.status
    err.body = await res.json().catch(() => ({}))
    throw err
  }
  return res.json().catch(() => ({}))
}

export async function authTelegramWidget(payload) {
  const res = await fetch(`${API_BASE}/auth/telegram/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = new Error('Auth failed')
    err.status = res.status
    err.body = await res.json().catch(() => ({}))
    throw err
  }
  return res.json()
}

export async function authTelegramWebApp(initData) {
  const res = await fetch(`${API_BASE}/auth/telegram/webapp/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ init_data: initData }),
  })
  if (!res.ok) {
    const err = new Error('WebApp auth failed')
    err.status = res.status
    err.body = await res.json().catch(() => ({}))
    throw err
  }
  return res.json()
}
