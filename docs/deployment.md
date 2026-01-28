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

## Nginx: привязка домена hyper-development.ru

На VPS уже работают 80/443 и другие проекты. Нужно добавить **виртуальный хост** для hyper-development.ru, проксирующий на `127.0.0.1:8085`.

Пример конфига (создать от root, например `/etc/nginx/sites-available/hyper-development.ru`):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name hyper-development.ru www.hyper-development.ru;

    location / {
        proxy_pass http://127.0.0.1:8085;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Включить и перезагрузить Nginx:

```bash
sudo ln -sf /etc/nginx/sites-available/hyper-development.ru /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

После настройки DNS (A-запись hyper-development.ru → 213.159.67.199) — запросить SSL (Let's Encrypt):

```bash
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
