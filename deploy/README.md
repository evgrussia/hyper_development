# Деплой на VPS и CI/CD

Деплой Universal Backend (frontend + backend + PostgreSQL) на VPS, Nginx, HTTPS, автодеплой через GitHub Actions.

## Быстрый старт

1. **VPS:** Ubuntu 24.04, Docker, Nginx, пользователь `deploy` с SSH-ключом. Клонировать репо в `/var/www/hyper_development`.
2. **GitHub:** Settings → Secrets and variables → Actions → добавить `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER`.
3. **Сервер:** `cp deploy/.env.production.example .env` в каталоге проекта, подставить секреты. Nginx configs из `deploy/nginx/`, затем `certbot --nginx -d base-api... -d base-front...`.
4. **DNS:** A-записи для доменов на IP VPS.
5. **Деплой:** `git push` в `main` → запускается workflow Deploy (или вручную через workflow_dispatch).

## Домены

| Сервис | Домен |
|--------|--------|
| Frontend (SPA) | `base-api.hyper-development.ru` |
| Backend (Django API) | `base-front.hyper-development.ru` |

При необходимости можно поменять: обычно **api** = бэкенд, **front** = фронтенд.

## 1. Подготовка VPS (один раз)

- **ОС:** Ubuntu 24.04 LTS.
- Установить Docker (и Docker Compose plugin), Nginx, Certbot.
- Создать пользователя `deploy`, добавить его в группу `docker`, настроить SSH-доступ по ключу.
- Клонировать репо в `/var/www/hyper_development` (или другой путь → см. переменная `PROJECT_PATH` ниже).

Опционально — скрипт первичной настройки (Docker должен быть уже установлен):

```bash
sudo bash deploy/scripts/vps-setup.sh /var/www/hyper_development https://github.com/evgrussia/hyper_development.git main
```

## 2. Файл `.env` на сервере

В каталоге проекта на VPS:

```bash
cd /var/www/hyper_development
cp deploy/.env.production.example .env
```

Отредактировать `.env`: подставить `DJANGO_SECRET_KEY`, `POSTGRES_PASSWORD`, `TELEGRAM_BOT_TOKEN`, при необходимости поменять домены. **Не коммитить `.env` в репо.**

## 3. Nginx и SSL

- Скопировать конфиги из `deploy/nginx/` в `/etc/nginx/sites-available/`, включить в `sites-enabled`.
- Проверить: `sudo nginx -t` → `sudo systemctl reload nginx`.
- Выдать сертификаты:

```bash
sudo certbot --nginx -d base-api.hyper-development.ru -d base-front.hyper-development.ru --non-interactive --agree-tos -m YOUR_EMAIL
```

## 4. DNS

Указать A-записи для `base-api.hyper-development.ru` и `base-front.hyper-development.ru` на IP VPS (например `213.159.67.199`).

## 5. GitHub Secrets и Variables (для CI/CD)

В репозитории: **Settings → Secrets and variables → Actions.**

**Secrets:**

| Имя | Описание |
|-----|----------|
| `VPS_SSH_KEY` | Приватный SSH-ключ пользователя `deploy` (или того, кто деплоит) |
| `VPS_HOST` | IP или hostname VPS (например `213.159.67.199`) |
| `VPS_USER` | SSH-пользователь (например `deploy`) |

**Variables (опционально):**

| Имя | Описание |
|-----|----------|
| `PROJECT_PATH` | Путь к проекту на VPS (по умолчанию `/home/deploy/hyper_development`) |

Токены (Telegram, GitHub PAT и т.п.) **никогда** не хранить в коде и не добавлять в репо — только в `.env` на сервере или в Secrets по необходимости. После настройки Secrets рекомендуется сменить GitHub PAT.

## 6. Автодеплой (GitHub Actions)

Workflow **Deploy** (`.github/workflows/deploy.yml`):

- Запускается при **push** в `main` или `master`, а также по **workflow_dispatch** (ручной запуск).
- Подключается по SSH к VPS, выполняет `git pull` в каталоге проекта, затем `docker compose --env-file .env up -d --build`.

Деплой только через Git: изменения в репо → push → на сервере `git pull` и пересборка контейнеров.

## 7. Проверка после деплоя

- Frontend: `https://base-api.hyper-development.ru`
- Backend API: `https://base-front.hyper-development.ru/api/`
- Админка Django: `https://base-front.hyper-development.ru/admin/`

## 8. Репозиторий

Указанный репо: `https://github.com/evgrussia/hyper_development.git`. Workflow и конфиги рассчитаны на эту структуру (корень: `docker-compose.yml`, `backend/`, `frontend/`, `deploy/`).

---
*Документ создан: DevOps Agent | Дата: 2025-01-29*
