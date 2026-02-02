---
title: "Деплой Hyper-Development на VPS"
created_by: "DevOps Agent"
created_at: "2025-01-29"
---

# Деплой на production (VPS)

## Параметры

| Параметр | Значение |
|----------|----------|
| Домен | hyper-development.ru |
| VPS | 213.159.67.199 (biomax-vps) |
| Репозиторий | https://github.com/evgrussia/hyper_development.git |
| Путь на сервере | /home/deploy/hyper_development |
| Порт приложения | **8085** (80, 443, 8082, 8083, 8084 заняты другими проектами) |
| Деплой | только через git |

## Docker-инфраструктура

- **frontend/Dockerfile** — multi-stage: Node 20 (Vite build) → Nginx Alpine (раздача статики).
- **api/Dockerfile** — Node 20 Alpine, сервис POST /send-order → Telegram.
- **docker-compose.yml** — сервисы `frontend` (порт 8085:80), `order-api` (порт 8086:3000).

Перед деплоем задайте на VPS переменные для order-api: `TELEGRAM_BOT_TOKEN` (обязательно), `TELEGRAM_CHAT_ID` (опционально, по умолчанию 219800788). Nginx проксирует `/api/` на 127.0.0.1:8086.

## Деплой (только через git)

На сервере под пользователем `deploy`:

```bash
cd /home/deploy/hyper_development
git fetch origin && git pull origin main
docker compose build
docker compose up -d
```

Проверка:

```bash
docker ps --filter name=hyper_development
curl -s http://127.0.0.1:8085/health   # должно вернуть "ok"
curl -s -X POST http://127.0.0.1:8086/send-order -H "Content-Type: application/json" -d '{"name":"Test","contact":"+7"}'  # без токена — 500, с токеном — 200
```

## Nginx и SSL: завершение деплоя (один раз на VPS)

Конфиг и скрипт уже лежат на сервере в `/home/deploy/hyper_development/deploy/`. Домен привязан; осталось включить Nginx и выдать сертификат.

**Выполните на VPS один раз (потребуется пароль sudo):**

Если скрипт выдаёт ошибки вида `$'\r': command not found` — сначала исправьте переводы строк (CRLF → LF), затем запустите:

```bash
sed -i 's/\r$//' /home/deploy/hyper_development/deploy/*.sh /home/deploy/hyper_development/deploy/*.conf
sudo bash /home/deploy/hyper_development/deploy/complete-nginx-and-ssl.sh
```

Иначе достаточно:

```bash
sudo bash /home/deploy/hyper_development/deploy/complete-nginx-and-ssl.sh
```

Скрипт:
1. Копирует `deploy/nginx-hyper-development.ru.conf` в `/etc/nginx/sites-available/hyper-development.ru`
2. Включает сайт (symlink в sites-enabled)
3. Проверяет конфиг (`nginx -t`) и перезагружает Nginx
4. Запускает Certbot для SSL (hyper-development.ru и www.hyper-development.ru)
5. Перезагружает Nginx после выдачи сертификата

После выполнения сайт будет доступен по **https://hyper-development.ru** и **https://www.hyper-development.ru**.

Для уведомлений Let's Encrypt по email (опционально):  
`sudo CERTBOT_EMAIL=your@email.com bash /home/deploy/hyper_development/deploy/complete-nginx-and-ssl.sh`

---

### Ручные шаги (если скрипт не использовать)

Конфиг в репозитории: `deploy/nginx-hyper-development.ru.conf` (прокси на 127.0.0.1:8085).

```bash
# На VPS
sudo cp /home/deploy/hyper_development/deploy/nginx-hyper-development.ru.conf /etc/nginx/sites-available/hyper-development.ru
sudo ln -sf /etc/nginx/sites-available/hyper-development.ru /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d hyper-development.ru -d www.hyper-development.ru
```

## Rollback

```bash
cd /home/deploy/hyper_development
git checkout <предыдущий_коммит>
docker compose build && docker compose up -d
```

## API отправки заказа (`/api/send-order`)

Логика приёма заявок реализована в **Vercel serverless**: `frontend/api/send-order.ts`. На VPS в Docker запускается только **статический фронт** (nginx + Vite build), поэтому POST на `https://hyper-development.ru/api/send-order` попадает в nginx контейнера и возвращает **405 Not Allowed**.

**Варианты решения:**

1. **Проксировать `/api/` на внешний endpoint** (например, Vercel) — в nginx добавить `location /api/` с `proxy_pass` на URL, где развёрнута serverless-функция.
2. **Завести на VPS отдельный API-сервис** (например, Node), реализующий ту же логику, что и `send-order.ts`; в nginx проксировать `location /api/` на этот сервис; в `docker-compose.yml` добавить сервис и порт.
3. **Сборка с `VITE_ORDER_API_URL`** — указать при сборке фронта URL готового API (Vercel или другой), тогда форма будет слать запросы на этот URL; nginx не меняется.

См. задачу для DevOps ниже (handoff).

## Важно

- Не трогать порты 80, 443, 8082, 8083, 8084 — они заняты psychology, biomax, hyper_invest.
- Фото разработчика: по умолчанию используется `frontend/public/developer-photo.svg` (URL: `/developer-photo.svg`). Чтобы использовать PNG, добавьте `developer-photo.png` в `public/` и смените URL в `About.tsx`.

---
*Документ создан: DevOps Agent | Дата: 2025-01-29*
