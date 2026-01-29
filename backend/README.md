# Universal Backend (Django)

Бэкенд для универсального MVP: авторизация через Telegram (widget + WebApp), JWT, пользователи.

## Phase 1: Авторизация (Telegram)

- **POST /api/auth/telegram/** — вход через Telegram Login Widget (тело: id, first_name, last_name, username?, photo_url?, auth_date, hash). Ответ: `{ "access": "...", "refresh": "..." }`.
- **POST /api/auth/telegram/webapp/** — вход для Telegram Mini App (тело: `{ "init_data": "<raw initData>" }`). Ответ: JWT.
- **POST /api/auth/jwt/refresh/** — обновление access по refresh (тело: `{ "refresh": "..." }`).

### Запуск

1. Скопировать `.env.example` в `.env`, задать `TELEGRAM_BOT_TOKEN` (из BotFather).
2. PostgreSQL: создать БД и задать переменные `POSTGRES_*` в `.env`.
3. `pip install -r requirements.txt`
4. `python manage.py migrate`
5. `python manage.py runserver`

Тесты: `DJANGO_SETTINGS_MODULE=config.settings.test python manage.py test users.tests`

---
*Документ создан: Coder Agent | Дата: 2025-01-29*
