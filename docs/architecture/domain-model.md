---
title: "Domain Model: Hyper-Development Agency Site"
created_by: "Architect Agent"
created_at: "2025-01-28"
---

# Domain Model

## Entities & Aggregates

### Portfolio (Портфолио)

**Aggregate root:** `PortfolioItem`

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| title | string | Название кейса |
| description | text | Описание (краткое или полное) |
| link | URL, optional | Ссылка на проект/демо |
| image | Image/URL, optional | Превью/изображение |
| order | int | Порядок отображения (сортировка) |
| is_active | bool | Показывать на лендинге |
| created_at | datetime | Дата создания |
| updated_at | datetime | Дата обновления |

**Правила:** Порядок уникален в рамках списка; при удалении — мягкое удаление или каскад по решению.

---

### Services (Услуги)

**Aggregate root:** `Service`

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| title | string | Название услуги |
| description | text | Описание услуги |
| order | int | Порядок отображения |
| is_active | bool | Показывать на лендинге |
| created_at | datetime | Дата создания |
| updated_at | datetime | Дата обновления |

---

### Landing Sections (Секции лендинга)

**Aggregate root:** `LandingSection`

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| key | string, unique | Ключ секции (hero, services, portfolio, about, order_form) |
| title | string, optional | Заголовок секции (если редактируется) |
| content | text/JSON, optional | Контент секции (если хранится в БД) |
| order | int | Порядок отображения |
| is_enabled | bool | Включена ли секция |
| created_at | datetime | Дата создания |
| updated_at | datetime | Дата обновления |

**Альтернатива:** Секции как конфиг (YAML/JSON в репозитории) без БД — тогда доменная сущность не нужна; управление «вкл/выкл» и порядком через админку может опираться на простую таблицу SectionConfig (key, order, is_enabled).

---

### Order Modules (Модули заказа)

**Aggregate root:** `OrderModule`

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| title | string | Название модуля |
| description | text, optional | Описание модуля |
| order | int | Порядок в форме заказа |
| is_active | bool | Доступен для выбора |
| created_at | datetime | Дата создания |
| updated_at | datetime | Дата обновления |

---

### Orders (Заказы)

**Aggregate root:** `Order`

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| contact_name | string | Имя заказчика |
| contact_email | string, optional | Email |
| contact_phone | string, optional | Телефон |
| description | text, optional | Описание задачи |
| status | enum | new, in_progress, completed, cancelled |
| created_at | datetime | Дата создания |
| updated_at | datetime | Дата обновления |

**Связь:** Order → OrderItem (many-to-many с OrderModule через промежуточную таблицу OrderItem).

**OrderItem (связь заказа и модулей):**

| Поле | Тип | Описание |
|------|-----|----------|
| id | PK | Уникальный идентификатор |
| order_id | FK → Order | Заказ |
| order_module_id | FK → OrderModule | Выбранный модуль |

Один заказ может иметь несколько выбранных модулей (0..n). Альтернатива: хранить в Order массив id модулей (JSONField) — проще для MVP; нормализованный вариант — отдельная таблица OrderItem.

---

## ER (упрощённая схема)

```
PortfolioItem     (id, title, description, link, image, order, is_active, created_at, updated_at)
Service            (id, title, description, order, is_active, created_at, updated_at)
LandingSection     (id, key, title, content, order, is_enabled, created_at, updated_at)
OrderModule        (id, title, description, order, is_active, created_at, updated_at)
Order              (id, contact_name, contact_email, contact_phone, description, status, created_at, updated_at)
OrderItem          (id, order_id, order_module_id)  -- или модули в Order как JSONField
```

## Django Apps (рекомендуемое разбиение)

- `portfolio` — PortfolioItem
- `services` — Service
- `landing` — LandingSection (или конфиг)
- `order_modules` — OrderModule
- `orders` — Order, OrderItem (или Order.modules JSONField)

**Общее:** Каждое приложение — свои модели, миграции, админка (Django Admin или кастомная SPA); API — отдельные views/serializers или DRF ViewSets.

## Domain Events (опционально)

- **OrderCreated:** при создании заказа из формы — триггер отправки уведомления в Telegram. Обработчик в Django: после сохранения Order вызвать сервис интеграции с Telegram.

---
*Документ создан: Architect Agent | Дата: 2025-01-28*
