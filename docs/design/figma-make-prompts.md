---
title: "Промпты для Figma Make: Hyper-Development — промо-сайт проекта (полный охват)"
created_by: "Orchestrator Agent"
created_at: "2025-01-28"
---

# Промпты для Figma Make — промо-сайт проекта Hyper-Development

Используйте эти промпты в **Figma Make** для создания промо-сайта, который **максимально подробно описывает весь проект**: MVP, P1/P2, out of scope, персоны, функционал, стек, метрики. Дизайн — **самый современный и трендовый для 2026 года**.

**Источники контента:** `context/project-brief.yaml`, `docs/discovery/` (PRD, vision, user-stories), `docs/architecture/` (domain-model, overview), `docs/design/` (design-system, IA, user-flows), NFR, research, analytics.

**Порядок:** сначала создайте референс стиля (раздел 0), затем — мастер-бриф (раздел 0.1) для контекста, после чего генерируйте экраны по номерам.

---

## 0.1. Мастер-бриф проекта (контекст для Figma Make)

**Использование:** скопируйте этот блок в начало сессии или в описание проекта в Figma Make, чтобы AI имел полный контекст.

```
PROJECT: Hyper-Development Agency Site (hyper-development.ru)

PURPOSE: Промо-сайт агентства — портфолио + лендинг + форма заказа web-приложений. Одна точка входа для заказчиков: компетенции, формат работы, заказ без лишних шагов.

TARGET AUDIENCE:
- Заказчик MVP — быстрый MVP с выбором модулей.
- Бизнес-заказчик — рефакторинг, интеграции; кейсы и услуги.
- Грантодержатель — 24ч-пакет документов и грантовое сопровождение.
- Владелец (админ) — управление контентом и заказами, уведомления в Telegram.

VALUE PROPOSITION:
- За 24ч: комплект документов (Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования) + промо-сайт + демо со всеми экранами.
- Разработка под ключ: от идеи до MVP и продакшен; MVP в эксплуатацию ~через неделю после согласования.
- Модульный заказ: выбор модулей из каталога (редактируется в админке); уведомления только в Telegram webapp.
- Позиционирование: авторская AI-агентская система; DDD, Clean Architecture; SOLID, DRY, KISS; Telegram webapp, подготовка к нагрузке (облако, Helm, Kong, Kafka, Istio, CI/CD); финтех, Saga, CQRS.

SERVICES (полный список для отображения):
1) Проработка идеи и документация (Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования)
2) За 24ч: комплект документов, промо-сайт, демо со всеми экранами
3) Разработка под ключ: от идеи до MVP и продакшен
4) MVP-разработка, грантовое сопровождение
5) Рефакторинг (стек, интеграции, монолит → микросервисы/микрофронтенды)
6) Telegram webapp, подготовка к нагрузке (облако, Helm, Kong, Kafka, Istio, CI/CD)
7) Финтех, распределённые системы (Saga, CQRS)

ABOUT DEVELOPER: Евгений Пономарев. Fullstack / Software Architect. 20 лет опыта. Высшее техническое, прикладная информатика. Сертификация: Яндекс — Архитектор ПО (2026). 30+ проектов в продакшен за последние 4 года.

FUNCTIONALITY (всё, включая не-MVP):
- Публичный лендинг: герой, услуги, портфолио, «О разработчике», CTA, форма заказа с выбором модулей из админки.
- Отправка заказа → бэкенд + уведомление в Telegram (bot webapp).
- Админка: CRUD портфолио, услуг, секций лендинга (порядок, вкл/выкл), модулей заказа; список заказов, статусы (новый, в работе, выполнен, отменён), детали заказа.
- P2: SEO-метатеги и Open Graph из админки; предпросмотр лендинга перед публикацией.
- Out of scope (для роадмапа/будущего): мультиязычность (EN), платёжная система на сайте, личный кабинет заказчика, интеграция с CRM (кроме заказ→Telegram).

TECH STACK: Frontend — Vite + React; Backend — Django; DB — PostgreSQL (или SQLite MVP); Nginx, VPS 213.159.67.199; SSL Let's Encrypt; уведомления — только Telegram Bot API.

SUCCESS METRICS: Конверсия в заказ (% отправивших форму); просмотры секций «Услуги» и «Портфолио»; время до первого ответа на заказ в Telegram. North Star: квалифицированные заказы в месяц.

LOCALE: RU. Design: современный трендовый 2026.
```

---

## 0. Референс стиля (создать первым)

**Промпт:**

```
Design system reference frame for a 2026 tech agency promo website. Style: Liquid Glass aesthetic (iOS 26–inspired) — frosted glass panels, soft blur, depth layers, surfaces that feel fluid and responsive. Color: dark theme — deep navy/slate background (#0F172A), accent gradient violet-to-cyan (#4F46E5 to #06B6D4). Typography: large bold headings (Plus Jakarta Sans or Manrope), clear hierarchy, 48–64px hero on desktop; optional monospace accent for tech/code. Components: primary CTA with gradient or solid accent, radius 8–12px; cards with light glass effect and soft shadow; inputs with visible focus ring. Use organic soft shapes and subtle motion hints where relevant. Mood: professional, trustworthy, tech-forward. Include tokens: 2 buttons (primary, secondary), 1 input, 1 card tile, heading + body samples. WCAG AA contrast. One artboard 1200px wide. 2026 trends: liquid glass, expressive typography, moderate gradients, no clutter.
```

---

## Лендинг (публичная зона)

### 1. Hero (первый экран)

**Промпт:**

```
Landing hero for web development agency "Hyper-Development" (hyper-development.ru). 2026 Liquid Glass style — header with frosted glass, sticky or static. Centered block max-width 1200px. Headline 48–64px: "Разработка web-приложений под ключ" or "От идеи до MVP за неделю". Subheadline: про 24ч-пакет документов и демо, модульный заказ, уведомления в Telegram. One prominent CTA "Заказать проект". Background: deep dark (#0F172A), subtle gradient or soft mesh/grid; optional subtle 3D or organic shape. Header: logo/wordmark left; nav center — Услуги, Портфолио, О разработчике, Ценности (optional); CTA right. Desktop 1440px. Clean, confident. Reflect value: one stop for portfolio, services, and order with module selection.
```

**Мобильный вариант (опционально):**

```
Same hero, mobile 375px: stacked layout, headline 32–40px, one CTA full-width or centered. Header: hamburger + logo. Vertical rhythm, touch-friendly.
```

---

### 2. Секция «Ценность / Как мы работаем»

**Промпт:**

```
Value proposition section for tech agency. Title "Ценность" or "Как мы работаем". 2026 Liquid Glass cards. Content to show: (1) За 24ч — комплект документов (Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования) + промо-сайт + демо со всеми экранами. (2) Модульный заказ — выбор модулей из каталога, без лишних шагов. (3) Уведомления только в Telegram — владелец получает заказы в webapp. (4) MVP в эксплуатацию ~через неделю после согласования; DDD, Clean Architecture. 3–4 value cards with icon/numeral, short title, 2–3 lines description. Glass-style panels, rounded 12px. Dark theme, accent gradient on borders or icons. 1200px container. 2026: clear hierarchy, subtle depth.
```

---

### 3. Секция «Услуги»

**Промпт:**

```
Services section for tech agency landing. Section title "Услуги". Grid of 6–7 service cards (desktop: 2–3 columns). Each card: glass-style surface (frosted, soft shadow), title, short description. Services to list: 1) Проработка идеи и документация (Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования). 2) За 24ч: комплект документов, промо-сайт, демо со всеми экранами. 3) Разработка под ключ: от идеи до MVP и продакшен. 4) MVP-разработка, грантовое сопровождение. 5) Рефакторинг (стек, интеграции, монолит → микросервисы/микрофронтенды). 6) Telegram webapp, подготовка к нагрузке (облако, Helm, Kong, Kafka, Istio, CI/CD). 7) Финтех, распределённые системы (Saga, CQRS). Hover: slight lift or glow. Spacing 24–32px between cards, 48px section padding. Dark theme, accent on borders/icons. 1200px, 2026 clean cards.
```

---

### 4. Секция «Портфолио»

**Промпт:**

```
Portfolio / case studies section. Title "Портфолио" or "Примеры работ". Grid 2–3 columns. Each card: image placeholder (16:9 or 4:3), project title, short description, link "Подробнее". Glass-style panel, radius 12px. Optional empty state: "Скоро появятся новые проекты" (muted). Data source note: портфолио управляется в админке (CRUD). Dark theme, 1200px. 2026: clear imagery area, readable text, subtle hover.
```

---

### 5. Секция «О разработчике»

**Промпт:**

```
About the developer section. Title "О разработчике". Two-column: left — text block. Content: Евгений Пономарев. Fullstack / Software Architect. 20 лет опыта. Высшее техническое, прикладная информатика. Сертификация: Яндекс — Архитектор ПО (2026). 30+ проектов в продакшен за последние 4 года. Right: avatar/photo placeholder (circle or rounded square). Optional CTA "Заказать" below text. Typography: name bold, role and facts body. Dark theme, 1200px. 2026: good whitespace, clear hierarchy.
```

---

### 6. Секция «Для кого» (персоны)

**Промпт:**

```
Audience / personas section for agency site. Title "Для кого" or "Кому подойдёт". 3 persona cards. (1) Заказчик MVP — быстрый MVP с выбором модулей; цель: увидеть кейсы, оформить заказ с модулями. (2) Бизнес-заказчик — рефакторинг, интеграции; цель: понять услуги, оставить заявку. (3) Грантодержатель — документация и реализация под грант; цель: 24ч-пакет и грантовое сопровождение. Each card: short persona name, 1–2 lines goal/pain. Glass-style, 1200px, 3 columns desktop. 2026: scannable, minimal copy.
```

---

### 7. Секция «Стек и инфраструктура»

**Промпт:**

```
Tech stack section for agency promo. Title "Стек и инфраструктура" or "Технологии". Show: Frontend — Vite + React; Backend — Django; DB — PostgreSQL; Nginx, VPS, SSL Let's Encrypt; уведомления — Telegram Bot API. Optional: DDD, Clean Architecture, модульный монолит. Visual: badges, icons, or short list in glass cards. Dark theme, accent for tech terms. 1200px. 2026: clear, not overwhelming.
```

---

### 8. Форма заказа (#order)

**Промпт:**

```
Order / contact form section. Title "Оставить заявку" or "Заказать проект". Single-column form, max-width 480px centered. Fields: "Имя" (text), "Контакт" (email or phone), "Описание" (textarea, optional). Block "Модули проекта" — 4–6 checkboxes (examples: "Документация", "Дизайн", "MVP", "Поддержка", "Рефакторинг", "Грантовое сопровождение") — список редактируется в админке. Primary submit "Отправить заявку". States: default, one focus ring, one error (red border + small error text). Success: "Заявка отправлена. Мы свяжемся с вами в Telegram." — green tint, checkmark. 2026: rounded inputs, clear labels, accessible focus. Dark theme.
```

---

### 9. Секция «Метрики успеха» (опционально)

**Промпт:**

```
Success metrics section for agency landing. Title "Результаты" or "Метрики". Short list or 3 stat blocks: Конверсия в заказ (% отправивших форму); Просмотры секций Услуги и Портфолио; Время до первого ответа в Telegram. North Star: квалифицированные заказы в месяц. Minimal copy, numerals or short labels. Glass cards or simple list. 1200px, dark theme. 2026: credible, not salesy.
```

---

### 10. Секция «Роадмап / Планы» (out of scope)

**Промпт:**

```
Roadmap or "В планах" section for agency site. Title "В планах" or "Развитие продукта". List out-of-scope items as future: мультиязычность (EN), платёжная система на сайте, личный кабинет заказчика, интеграция с CRM (кроме заказ→Telegram). Visual: timeline or checklist, muted style, "скоро" or "roadmap". Dark theme, 1200px. 2026: transparent, minimal.
```

---

### 11. Футер

**Промпт:**

```
Minimal footer for agency landing. Links: Услуги, Портфолио, О разработчике, Заказать (anchors). Telegram icon + link, optional email. Copyright "© 2026 Hyper-Development". Single or two rows, centered or left. Dark background, muted text. 1200px. 2026: clean, minimal, good contrast.
```

---

## Админка (панель управления)

### 12. Вход (Login)

**Промпт:**

```
Admin login page. Centered card (glass or solid panel), max-width 400px. Fields: "Email или логин", "Пароль". Button "Войти" — primary. Optional error: "Неверный логин или пароль" in red. Dark theme. 2026: simple form, clear focus, no clutter.
```

---

### 13. Список сущностей (Портфолио / Услуги / Модули заказа)

**Промпт:**

```
Admin dashboard list view. Left sidebar: icons + labels "Портфолио", "Услуги", "Секции лендинга", "Модули заказа", "Заказы". Main: page title "Портфолио" (or Услуги / Модули заказа), top-right "Добавить". Table or card list: columns "Название", "Порядок", "Активен" (is_active), "Действия" (Edit, Delete). 5–6 sample rows. Empty state: "Добавьте первую запись". Dark sidebar, content area. 2026: clear table, good density, accessible.
```

---

### 14. Форма редактирования (Портфолио / Услуги / Модули)

**Промпт:**

```
Admin edit form. Same sidebar as list. Main: form "Редактирование кейса" (or Услуги / Модуль). Fields: Название, Описание (textarea), Ссылка (portfolio), Загрузка изображения (file), Порядок (number), Активен (toggle). Buttons "Сохранить" (primary), "Отмена". One field in error state. 600px form width. 2026: consistent inputs, clear actions.
```

---

### 15. Секции лендинга

**Промпт:**

```
Admin "Секции лендинга" page. Sidebar as before. Main: title "Секции лендинга". List: Герой, Услуги, Портфолио, О разработчике, Форма заказа (keys: hero, services, portfolio, about, order_form). Each row: name, toggle On/Off, order/drag handle. Optional "Редактировать контент". 2026: clear toggles, scannable list.
```

---

### 16. Список заказов

**Промпт:**

```
Admin orders list. Sidebar. Main: "Заказы". Filters: Все, Новый, В работе, Выполнен, Отменён. Table: Дата, Контакт, Модули (short), Статус (badge), Действия (View). 4–5 rows mixed statuses. Empty: "Заказов пока нет". Optional pagination. 2026: clear status colors, readable.
```

---

### 17. Детали заказа

**Промпт:**

```
Admin order detail. Sidebar. Main: "Заказ #1". Block: Дата, Имя, Контакт (email/phone), Описание, Список выбранных модулей (bullets). Status: Новый, В работе, Выполнен, Отменён. Button "Сохранить". 2026: card layout, clear hierarchy.
```

---

## Сводка по экранам

| № | Экран | Breakpoint | Контент/примечание |
|---|--------|------------|---------------------|
| 0.1 | Мастер-бриф | — | Контекст для AI (текст выше) |
| 0 | Референс стиля | 1200px | Создать первым |
| 1 | Hero | 1440px (+ 375px mobile) | Ценность, 24ч, модульный заказ |
| 2 | Ценность / Как мы работаем | 1200px | 24ч, модули, Telegram, MVP за неделю |
| 3 | Услуги | 1200px | Все 7 услуг из project-brief |
| 4 | Портфолио | 1200px | Кейсы из админки |
| 5 | О разработчике | 1200px | Евгений Пономарев, 20 лет, сертификация |
| 6 | Для кого (персоны) | 1200px | MVP, Бизнес, Грантодержатель |
| 7 | Стек и инфраструктура | 1200px | Vite, React, Django, PostgreSQL, Telegram |
| 8 | Форма заказа | 480px form | Имя, контакт, описание, модули (чекбоксы) |
| 9 | Метрики успеха | 1200px | Конверсия, просмотры, время ответа |
| 10 | Роадмап (out of scope) | 1200px | Мультиязычность, платежи, ЛК, CRM |
| 11 | Футер | 1200px | Ссылки, Telegram, © 2026 |
| 12 | Login | 400px card | Админка |
| 13 | Список (Портфолио/Услуги/Модули) | 1280px | CRUD списки |
| 14 | Форма редактирования | 1280px | CRUD форма |
| 15 | Секции лендинга | 1280px | Вкл/выкл, порядок |
| 16 | Список заказов | 1280px | Фильтр по статусу |
| 17 | Детали заказа | 1280px | Статус, контакт, модули |

---

## Ключевые тренды 2026 в промптах

- **Liquid Glass / Glassmorphism** — полупрозрачные панели, лёгкий blur, глубина; поверхности реагируют на контекст.
- **Крупная типографика** — hero 48–64px, чёткая иерархия; опционально моноширинный акцент для tech.
- **Тёмная тема** — #0F172A, акцент градиент violet–cyan.
- **Органические формы и мягкие градиенты** — без жёстких углов где уместно.
- **Выразительность без перегруза** — градиенты и тени умеренно.
- **Доступность** — контраст WCAG AA, видимый focus.
- **Tech-агентство** — профессионально, доверие, современный стек.

После генерации в Figma Make проверьте контраст, подписи на русском и соответствие `docs/design/design-system.md`.

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-28*
