# Universal Backend Frontend (React + Vite)

Фронтенд для универсального MVP: вход через Telegram (виджет и WebApp), личный кабинет.

## Phase 1: Авторизация

- **Виджет (web):** на странице /login отображается Telegram Login Widget (если задан `VITE_TELEGRAM_BOT_NAME`). После входа данные отправляются на `POST /api/auth/telegram/`, токены сохраняются в localStorage, редирект на /me.
- **WebApp (Mini App):** при открытии в Telegram при запуске отправляется `init_data` на `POST /api/auth/telegram/webapp/`, токены сохраняются, редирект на /me. Токен используется в заголовке `Authorization: Bearer <access>` для всех API.

### Запуск

1. Скопировать `.env.example` в `.env`.
2. Задать `VITE_API_BASE_URL` (например `http://localhost:8000/api`) и `VITE_TELEGRAM_BOT_NAME` (username бота без @).
3. `npm install && npm run dev`

---
*Документ создан: Coder Agent | Дата: 2025-01-29*
