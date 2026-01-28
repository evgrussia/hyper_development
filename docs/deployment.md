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
- **docker-compose.yml** — один сервис `frontend`, порт 8085:80, healthcheck `/health`.

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
```

## Nginx и SSL: завершение деплоя (один раз на VPS)

Конфиг и скрипт уже лежат на сервере в `/home/deploy/hyper_development/deploy/`. Домен привязан; осталось включить Nginx и выдать сертификат.

**Выполните на VPS один раз (потребуется пароль sudo):**

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

## Важно

- Не трогать порты 80, 443, 8082, 8083, 8084 — они заняты psychology, biomax, hyper_invest.
- Фото разработчика: положить файл в `frontend/public/developer-photo.png` или заменить URL в `About.tsx`; иначе отображается fallback.

---
*Документ создан: DevOps Agent | Дата: 2025-01-29*
