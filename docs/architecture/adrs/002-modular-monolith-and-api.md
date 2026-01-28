---
title: "ADR-002: Modular Monolith and Public API"
created_by: "Architect Agent"
created_at: "2025-01-28"
status: Accepted
---

# ADR-002: Modular Monolith and Public API

## Status

Accepted (2025-01-28).

## Context

Бэкенд должен отдавать данные лендинга (портфолио, услуги, секции, модули заказа) и принимать заказы. Нужна чёткая граница между фронтом и бэкендом и возможность развивать админку и интеграции без переписывания.

## Decision

- **Архитектура бэкенда:** Modular Monolith на Django. Отдельные приложения (apps): portfolio, services, landing, order_modules, orders; общий слой интеграции с Telegram.
- **API для лендинга:** REST, JSON. Эндпоинты только для чтения (GET) для портфолио, услуг, секций, модулей заказа; один эндпоинт для создания заказа (POST). Без аутентификации для публичных эндпоинтов; CORS только для домена лендинга.
- **Админка:** Django Admin для CRUD сущностей и заказов (или кастомная SPA админки на том же React, с аутентификацией через Django).
- **Форма заказа:** POST /api/orders/ с телом (contact_name, contact_email, contact_phone, description, module_ids[]); валидация и rate limiting на стороне Django; после сохранения — вызов Telegram API.

## Consequences

- **Плюсы:** Понятные границы; фронт не зависит от внутренней структуры БД; легко добавить кэширование (Redis) или CDN для статики позже.
- **Минусы:** Нужно поддерживать контракт API (версионирование при изменении полей).
- **Риски:** Без rate limiting форма заказа уязвима к спаму; необходимо внедрить ограничение по IP/сессии.

## Alternatives Considered

- **BFF (Backend for Frontend):** Отложено; один публичный API достаточен для лендинга и формы.
- **GraphQL:** Выбран REST для простоты и малого числа сущностей.

---
*Документ создан: Architect Agent | Дата: 2025-01-28*
