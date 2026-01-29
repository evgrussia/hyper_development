import { Outlet } from 'react-router-dom'
import { useAuth } from './auth/useAuth'
import { Link } from 'react-router-dom'

export function Layout() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Link to="/">Главная</Link>
        {isAuthenticated ? (
          <>
            <Link to="/me">Личный кабинет</Link>
            <button type="button" onClick={logout}>Выход</button>
          </>
        ) : (
          <Link to="/login">Вход</Link>
        )}
      </nav>
      <Outlet />
    </div>
  )
}
