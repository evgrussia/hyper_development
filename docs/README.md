---
title: "Документация проекта Hyper-Development Agency Site"
created_by: "Orchestrator Agent"
created_at: "2025-01-28"
---

# Документация проекта

Структура документов по стадиям Discovery, Design, Architecture.

## Discovery

| Документ | Описание |
|----------|----------|
| [vision.md](discovery/vision.md) | Vision: проблема, ценность, аудитория, метрики, ограничения |
| [prd.md](discovery/prd.md) | PRD: цели, требования (P0/P1/P2), NFR, риски, сроки |
| [user-stories.md](discovery/user-stories.md) | User Stories и Acceptance Criteria по персонам |
| [research-summary.md](discovery/research-summary.md) | Research: конкуренты, позиционирование, рекомендации |
| [analytics-plan.md](discovery/analytics-plan.md) | Метрики, North Star, Tracking Plan (MVP) |

## Design

| Документ | Описание |
|----------|----------|
| [user-flows.md](design/user-flows.md) | User Flows: лендинг → заказ, админка, Telegram |
| [information-architecture.md](design/information-architecture.md) | IA: контент, site map, навигация, лейблы |
| [wireframes.md](design/wireframes.md) | Wireframes / Screen Inventory: лендинг и админка |
| [design-system.md](design/design-system.md) | Design System 2026: токены, компоненты, доступность |

## Architecture

| Документ | Описание |
|----------|----------|
| [overview.md](architecture/overview.md) | Architecture Overview: границы, стек, интеграции |
| [domain-model.md](architecture/domain-model.md) | Domain Model: сущности, ER, Django apps |
| [nfr-specs.md](architecture/nfr-specs.md) | NFR: производительность, безопасность, наблюдаемость |
| [adrs/](architecture/adrs/) | ADR: 001 Stack & Deployment, 002 Modular Monolith & API |
| [frontend-audit.md](architecture/frontend-audit.md) | Аудит фронтенда: стек, структура, соответствие проекту |

## Frontend

| Ресурс | Описание |
|--------|----------|
| [frontend/](../frontend/) | Исходный код SPA: лендинг + админка (Vite + React, Tailwind, Radix) |
| [frontend/README.md](../frontend/README.md) | Запуск, разделы, доступ в админку, демо |
| [frontend-audit.md](architecture/frontend-audit.md) | Аудит и рекомендации по интеграции с Django |

## Контекст проекта

- **Project Brief:** [../context/project-brief.yaml](../context/project-brief.yaml)
- **Summaries:** [../context/summaries/](../context/summaries/) (в т.ч. [frontend-summary](../context/summaries/frontend-summary.yaml))
- **Checkpoints:** [../context/checkpoints/](../context/checkpoints/) ← последний: [checkpoint-2025-01-29-frontend](../context/checkpoints/checkpoint-2025-01-29-frontend.md)
- **Домен:** hyper-development.ru  
- **VPS:** 213.159.67.199  
- **Стек:** Vite + React, Django; уведомления — Telegram bot (webapp)

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-28*
