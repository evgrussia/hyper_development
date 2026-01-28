---
title: "Architecture Overview: Hyper-Development Agency Site"
created_by: "Architect Agent"
created_at: "2025-01-28"
---

# Architecture Overview

## System Boundaries

- **В scope:** Публичный лендинг (Vite + React), бэкенд API и админка (Django), БД (PostgreSQL или SQLite для MVP), Telegram Bot (webapp + уведомления о заказах), деплой на VPS 213.159.67.199, домен hyper-development.ru.
- **Вне scope (MVP):** Платежи, CRM, мультиязычность, личный кабинет заказчика.

## High-Level Architecture

```
                    Internet
                        │
                        ▼
              [ Nginx / Reverse Proxy ]
              hyper-development.ru :443
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
   [ Static / SPA ]  [ Django ]   [ Django ]
   Vite+React build  /api/*      /admin/*
   (статика или      REST/JSON   Admin + API
    через Nginx)
                        │
                        ▼
              [ PostgreSQL / SQLite ]
                        │
                        ▼
              [ Telegram Bot API ]
              (уведомления о заказах)
```

## Architecture Pattern

**Modular Monolith (Django):** один бэкенд-проект с чётко выделенными модулями (apps): портфолио, услуги, секции лендинга, модули заказа, заказы, интеграция Telegram. Фронт — отдельное SPA (Vite + React), общается с бэкендом по REST/JSON.

## Core Domains & Bounded Contexts

| Контекст | Ответственность | Основные сущности |
|----------|-----------------|-------------------|
| **Portfolio** | Кейсы на лендинге | PortfolioItem |
| **Services** | Услуги на лендинге | Service |
| **Landing** | Секции лендинга (вкл/выкл, порядок, контент) | LandingSection |
| **OrderModules** | Модули в форме заказа | OrderModule |
| **Orders** | Заявки с лендинга | Order, OrderItem (связь с модулями) |
| **Notifications** | Уведомления в Telegram | Интеграция с Telegram Bot API |

## Integration Points

| Система | Направление | Протокол | Назначение |
|---------|-------------|----------|------------|
| Django API | Frontend → Backend | REST, JSON | Данные лендинга (портфолио, услуги, секции, модули заказа); отправка заказа |
| Telegram Bot API | Backend → Telegram | HTTPS, webhook или long polling | Отправка уведомления владельцу о новом заказе; webapp для просмотра заказов (опционально) |
| Nginx | Client → VPS | HTTPS | Reverse proxy для Django и статики SPA; SSL (Let's Encrypt) |

## Data Flow (ключевые сценарии)

1. **Загрузка лендинга:** браузер запрашивает SPA; SPA запрашивает у Django API данные (портфолио, услуги, секции, модули заказа); рендер.
2. **Отправка заказа:** форма отправляет POST на Django; Django сохраняет заказ в БД, вызывает Telegram API (уведомление); возвращает 201/200; фронт показывает успех.
3. **Админка:** авторизованный пользователь запрашивает /admin/*; Django отдаёт админку или SPA админки; CRUD через API или Django Admin.

## Technology Stack (зафиксировано)

| Слой | Технология | Обоснование |
|------|------------|-------------|
| Frontend | Vite + React | Быстрая сборка, современный стек; решение заказчика |
| Backend | Django | REST API, админка, ORM, миграции; решение заказчика |
| DB | PostgreSQL (рекомендуется) или SQLite (MVP) | Надёжность и масштабируемость (PostgreSQL); SQLite — простой старт |
| Reverse proxy | Nginx | SSL, раздача статики, проксирование к Django |
| Hosting | VPS 213.159.67.199 | Домен hyper-development.ru; решение заказчика |
| Notifications | Telegram Bot API | Единственный канал уведомлений о заказах; webapp для владельца |

## Deployment (high-level)

- **VPS:** Ubuntu 24.04 LTS (рекомендуется); Nginx; systemd или Gunicorn/uWSGI для Django; статика SPA — из Nginx или из Django static.
- **CI/CD:** опционально — сборка фронта (Vite build), деплой артефактов на VPS; миграции Django при деплое.
- **SSL:** Let's Encrypt для hyper-development.ru.

## Security (кратко)

- HTTPS везде; секреты (SECRET_KEY, Telegram token, DB) — в переменных окружения, не в коде.
- Админка: аутентификация (Django auth); опционально 2FA.
- API: CORS только для домена лендинга; rate limiting на отправку формы заказа; валидация и санитизация входных данных.
- Заказы: не логировать PII в открытом виде; доступ к заказам только авторизованному админу.

Детали NFR — в `nfr-specs.md`; решения — в `adrs/`; доменная модель — в `domain-model.md`.

---
*Документ создан: Architect Agent | Дата: 2025-01-28*
