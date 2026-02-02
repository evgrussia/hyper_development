# Order API (VPS)

Минимальный HTTP-сервис для приёма заявок с лендинга и отправки в Telegram. Логика совпадает с `frontend/api/send-order.ts` (Vercel serverless).

- **POST /send-order** — тело JSON: `{ name, contact, description?, modules?, moduleNames? }`. Отправляет сообщение в Telegram.
- **OPTIONS /send-order** — CORS preflight.

## Переменные окружения

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | да | Токен бота Telegram |
| `TELEGRAM_CHAT_ID` | нет | ID чата (по умолчанию 219800788) |

## Запуск на VPS

Сервис поднимается через `docker compose` в корне репозитория. На сервере перед деплоем задайте env:

```bash
export TELEGRAM_BOT_TOKEN="ваш_токен"
export TELEGRAM_CHAT_ID="219800788"   # опционально
cd /home/deploy/hyper_development
docker compose up -d --build
```

Nginx проксирует `location /api/` на этот сервис (порт 8086), поэтому запросы с сайта к `https://hyper-development.ru/api/send-order` обрабатываются здесь.
