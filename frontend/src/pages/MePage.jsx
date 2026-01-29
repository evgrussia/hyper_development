import { useAuth } from '../auth/useAuth'

export function MePage() {
  const { tokens } = useAuth()

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Вы вошли в систему. JWT сохранён (localStorage).</p>
      {tokens?.access && (
        <p style={{ wordBreak: 'break-all', fontSize: 12 }}>
          Access token: {tokens.access.slice(0, 40)}…
        </p>
      )}
    </div>
  )
}
