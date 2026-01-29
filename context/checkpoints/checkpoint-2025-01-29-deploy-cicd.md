---
title: "Checkpoint — Деплой на VPS и CI/CD"
created_by: "Orchestrator Agent"
created_at: "2025-01-29"
---

# Checkpoint: Deploy & CI/CD

## Summary

Настроены деплой на VPS и автодеплой через GitHub Actions. Домены: frontend `base-api.hyper-development.ru`, backend `base-front.hyper-development.ru`. Репозиторий — `evgrussia/hyper_development`. Production-настройки Django, docker-compose с поддержкой .env, Nginx-конфиги, скрипт первичной настройки VPS, workflow Deploy (SSH → git pull → docker compose up).

## Артефакты

- `backend/config/settings/production.py` — production-профиль (DEBUG=False)
- `docker-compose.yml` — обновлён: DJANGO_SETTINGS_MODULE, ALLOWED_HOSTS, CORS, VITE_API_BASE_URL, TELEGRAM_BOT_TOKEN из env
- `.env.example` — добавлены ALLOWED_HOSTS, DJANGO_SETTINGS_MODULE
- `deploy/.env.production.example` — шаблон .env для VPS
- `deploy/nginx/base-api.hyper-development.ru.conf`, `deploy/nginx/base-front.hyper-development.ru.conf` — Nginx
- `deploy/scripts/vps-setup.sh` — первичная настройка VPS (clone, nginx, ufw)
- `deploy/README.md` — документация по деплою, Secrets, DNS, быстрый старт
- `.github/workflows/deploy.yml` — деплой по push в main/master и workflow_dispatch

## Решения

- Деплой только через Git: на VPS только `git pull`, затем `docker compose --env-file .env up -d --build`.
- Secrets: VPS_SSH_KEY, VPS_HOST, VPS_USER; опционально Variable PROJECT_PATH (по умолчанию `/var/www/hyper_development`).
- Токены (Telegram, GitHub PAT) не в коде — только в .env на сервере или в GitHub Secrets.

## Next actions

1. ~~Добавить в GitHub Secrets: `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER`~~ (сделано пользователем).
2. ~~На VPS: клонировать репо, создать `.env`, Nginx (base-api → 8085, base-front → 8010), certbot, Docker~~ (выполнено 2025-01-29).
3. ~~DNS, первый деплой~~ (готово). Автодеплой: push в main → workflow Deploy.
4. При смене портов: задать `BACKEND_HOST_PORT`, `FRONTEND_HOST_PORT` в `.env` на VPS и обновить Nginx proxy_pass.

## Blockers

Нет.

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-29*
