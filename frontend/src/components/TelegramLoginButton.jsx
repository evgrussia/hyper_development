import { useEffect, useRef } from 'react'

export function TelegramLoginButton({ botName, onAuth }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!botName || !containerRef.current || !onAuth) return

    window.onTelegramAuth = (user) => {
      onAuth(user)
    }

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.setAttribute('data-telegram-login', botName)
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'true')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.setAttribute('data-request-access', 'write')
    script.async = true
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current && script.parentNode) script.remove()
      delete window.onTelegramAuth
    }
  }, [botName, onAuth])

  return <div ref={containerRef} />
}
