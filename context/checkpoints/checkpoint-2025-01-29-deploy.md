---
title: "Checkpoint: Production deploy (Docker, biomax-vps)"
created_by: "Orchestrator Agent"
created_at: "2025-01-29"
---

# Checkpoint — 2025-01-29 (Deploy)

## Summary (≤500 tokens)

Проект Hyper-Development задеплоен на прод через MCP biomax-vps. Учтены занятые порты других проектов; выбран свободный порт **8085**. Деплой только через git; Docker-инфраструктура добавлена в репозиторий.

**Сервер:**
- Хост: vm4652062.example.com (213.159.67.199), пользователь deploy.
- Занятые порты: 80, 443, 8082, 8083, 8084, 8001 и др. (psychology, biomax_ai, hyper_invest).
- Свободный порт для hyper_development: **8085**.

**Сделано:**
- Созданы `frontend/Dockerfile` (multi-stage: Node → Nginx), `frontend/.dockerignore`, `docker-compose.yml` (порт 8085).
- Добавлены точки входа Vite: `frontend/index.html`, `frontend/src/main.tsx`; в `package.json` — react/react-dom.
- Заменён Figma-импорт фото в `About.tsx` на `/developer-photo.png` + ImageWithFallback (сборка без figma:asset).
- Репозиторий склонирован в `/home/deploy/hyper_development`; Docker-файлы загружены; сборка и запуск контейнера выполнены.
- Контейнер `hyper_development-frontend` работает на 0.0.0.0:8085, healthcheck `/health` возвращает "ok".

**Домен hyper-development.ru:** Nginx-виртуальный хост ещё не добавлен; инструкция в `docs/deployment.md`.

## Артефакты

| Путь | Тип |
|------|-----|
| `docker-compose.yml` | Docker Compose (порт 8085) |
| `frontend/Dockerfile` | Multi-stage build |
| `frontend/.dockerignore` | Исключения контекста |
| `frontend/index.html` | Точка входа Vite |
| `frontend/src/main.tsx` | React entry |
| `frontend/package.json` | react/react-dom в dependencies |
| `frontend/src/components/landing/About.tsx` | ImageWithFallback вместо figma:asset |
| `docs/deployment.md` | Деплой, Nginx, rollback |

## Key decisions

- Порт 8085 выбран как первый свободный после 8082–8084.
- Деплой только через git: на сервере `git pull` + `docker compose build` + `up -d`; для первого раза файлы загружены через MCP upload.
- Nginx для hyper-development.ru — отдельный шаг (см. docs/deployment.md).

## Next actions

1. Закоммитить и запушить в репозиторий: Docker-файлы, index.html, main.tsx, package.json, About.tsx, docs/deployment.md — чтобы дальнейший деплой был только через git pull.
2. Добавить виртуальный хост Nginx для hyper-development.ru (proxy_pass на 127.0.0.1:8085), перезагрузить Nginx.
3. Настроить DNS (A-запись hyper-development.ru → 213.159.67.199) и при необходимости SSL (certbot).
4. Положить фото разработчика в `frontend/public/developer-photo.png` или заменить URL в About.tsx.

## Blockers

Нет.

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-29*
