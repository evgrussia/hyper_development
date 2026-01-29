import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { authTelegramWidget, authTelegramWebApp, setStoredTokens } from '../api/client'
import { TelegramLoginButton } from '../components/TelegramLoginButton'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const webAppTried = useRef(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/me', { replace: true })
      return
    }
    // Telegram WebApp: при запуске Mini App отправить init_data на backend
    const tg = window.Telegram?.WebApp
    if (tg?.initData && !webAppTried.current) {
      webAppTried.current = true
      authTelegramWebApp(tg.initData)
        .then((tokens) => {
          setStoredTokens(tokens)
          login(tokens)
          navigate('/me', { replace: true })
        })
        .catch(() => {})
    }
  }, [isAuthenticated, login, navigate])

  const onTelegramAuth = async (user) => {
    try {
      const tokens = await authTelegramWidget(user)
      login(tokens)
      navigate('/me', { replace: true })
    } catch (e) {
      console.error('Telegram auth failed', e)
    }
  }

  const botName = import.meta.env.VITE_TELEGRAM_BOT_NAME || ''

  return (
    <div>
      <h1>Вход</h1>
      {botName ? (
        <TelegramLoginButton botName={botName} onAuth={onTelegramAuth} />
      ) : (
        <p>Укажите VITE_TELEGRAM_BOT_NAME в .env для виджета входа через Telegram.</p>
      )}
    </div>
  )
}
