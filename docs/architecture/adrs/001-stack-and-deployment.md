---
title: "ADR-001: Technology Stack and Deployment"
created_by: "Architect Agent"
created_at: "2025-01-28"
status: Accepted
---

# ADR-001: Technology Stack and Deployment

## Status

Accepted (2025-01-28).

## Context

Нужен сайт-портфолио с лендингом, формой заказа и админкой; уведомления о заказах — только в Telegram (webapp). Домен hyper-development.ru, хостинг — VPS 213.159.67.199. Заказчик определил стек и канал уведомлений.

## Decision

- **Frontend:** Vite + React. Сборка статики (SPA); раздача через Nginx или через Django static.
- **Backend:** Django. REST API для лендинга (портфолио, услуги, секции, модули заказа); приём формы заказа; админка (Django Admin или отдельное SPA админки).
- **Database:** PostgreSQL (рекомендуется) или SQLite для MVP.
- **Hosting:** VPS 213.159.67.199; домен hyper-development.ru; Nginx как reverse proxy и SSL (Let's Encrypt).
- **Notifications:** только Telegram Bot API — уведомление владельцу о новом заказе; опционально webapp для просмотра заказов.

## Consequences

- **Плюсы:** Единый стек (React + Django), знакомый заказчику; быстрый старт на VPS; один канал уведомлений — проще поддержка.
- **Минусы:** Масштабирование по вертикали (один VPS); при росте нагрузки потребуется оптимизация или перенос в облако.
- **Риски:** Зависимость от Telegram API; необходимо обеспечить безопасность токена бота и админки.

## Alternatives Considered

- **Next.js вместо Vite+React:** Выбрано Vite+React по решению заказчика; разделение фронт/бэкенд сохраняет гибкость.
- **Уведомления email + Telegram:** Решение — только Telegram для упрощения и единого канала.
- **Headless CMS вместо Django:** Django выбран для единого бэкенда (API + админка + заказы + интеграция Telegram).

---
*Документ создан: Architect Agent | Дата: 2025-01-28*
