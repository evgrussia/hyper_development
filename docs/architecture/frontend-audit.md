---
title: "Frontend Audit: Hyper-Development Agency Site"
created_by: "Orchestrator Agent"
created_at: "2025-01-29"
type: "audit"
---

# Аудит фронтенда (frontend/)

**Дата:** 2025-01-29  
**Область:** `frontend/` — SPA лендинг + админка для проекта Hyper-Development Agency Site.

## 1. Соответствие Project Brief и Architecture

| Требование (project-brief / architecture) | Статус | Комментарий |
|------------------------------------------|--------|-------------|
| Vite + React | ✅ | Vite 6.3, React 18.3 (peer) |
| Управление портфолио в админке | ✅ | PortfolioList, PortfolioForm, CRUD в DataContext |
| Управление услугами в админке | ✅ | ServicesList, ServicesForm |
| Управление секциями лендинга | ✅ | LandingSections, LandingSection в типах |
| Модули заказа (редактируемые в админке) | ✅ | ModulesList, ModulesForm, orderModules в контексте |
| Форма заказа с выбором модулей | ✅ | OrderForm, привязка к orderModules |
| Управление заказами в админке | ✅ | OrdersList, OrderDetail |
| Домен hyper-development.ru, locale ru | ⚠️ | Не задан в коде (деплой/конфиг) |

**Вывод:** Функционально фронт **полностью покрывает** main_features из project-brief и домены из architecture overview.

---

## 2. Стек и зависимости

| Категория | Используется | По архитектуре |
|-----------|--------------|----------------|
| Сборка | Vite 6 | ✅ ADR-001 |
| UI | React 18 | ✅ |
| Стили | Tailwind 4, theme.css | ✅ |
| Компоненты | Radix UI, shadcn-style (ui/) | — |
| Иконки | Lucide React | — |
| Анимации | Motion, canvas-confetti | — |
| Формы | react-hook-form (частично) | — |
| MUI (@mui/material, @emotion) | В package.json | ⚠️ Вероятно legacy; проверить использование |

**Рекомендации:**
- Удалить неиспользуемые зависимости (MUI, emotion), если не задействованы.
- Добавить в `package.json`: `"dev": "vite"`, `"preview": "vite preview"` для локальной разработки и проверки билда.

---

## 3. Структура и организация

```
frontend/
├── src/
│   ├── app/           # App.tsx, ui components (Radix), figma/
│   ├── components/    # admin/, landing/, common/, backgrounds/
│   ├── contexts/      # DataContext
│   ├── data/          # initialPortfolio
│   ├── hooks/         # useDebounce, useMediaQuery
│   ├── styles/        # fonts, tailwind, theme
│   └── types/         # Service, PortfolioItem, OrderModule, Order, LandingSection
├── guidelines/        # Figma/Make-специфичное
├── package.json, vite.config.ts, postcss.config.mjs
└── README.md, IMPROVEMENTS.md, …
```

**Плюсы:**
- Чёткое разделение: landing / admin / common / backgrounds.
- Единый DataContext для портфолио, услуг, модулей, заказов, секций.
- Lazy-loading админки (Login, AdminLayout, списки) — снижение начального бандла.
- Типы в `types/index.ts` соответствуют доменным сущностям.

**Замечания:**
- `app/components/figma/` — след Figma Make; при необходимости переименовать в `app/components/shared/` или оставить как есть.
- Нет явного `index.html` и `main.tsx` в репозитории — возможно, точка входа через Figma Make. Для автономного dev/build стоит добавить стандартный Vite entry.

---

## 4. Доменная модель vs типы фронта

| Домен (domain-model) | Типы фронта | Расхождение |
|----------------------|-------------|-------------|
| PortfolioItem | PortfolioItem | ✅ id, title, description, link, image, order, isActive |
| Service | Service | ✅ id, title, description, order, isActive |
| OrderModule | OrderModule | ✅ id, name, order, isActive (в домене — title; допустимо) |
| LandingSection | LandingSection | ✅ key, name, isActive, order |
| Order | Order | ⚠️ См. ниже |

**Order:**
- Домен: `contact_name`, `contact_email`, `contact_phone`, `description`, `status`; связь с модулями через OrderItem.
- Фронт: `name`, `contact`, `description`, `modules: string[]`, `status`.

**Рекомендация:** При интеграции с Django API задать маппинг: `name` → `contact_name`, `contact` → `contact_email` или объединённый контакт; `modules` → OrderItem-связки. Либо слегка расширить доменную модель под текущую форму.

---

## 5. Данные и интеграция с бэкендом

- **Сейчас:** Все данные в **localStorage** (DataContext + useDebounce). README помечает это как демо.
- **Целевая архитектура:** REST API Django (overview.md, ADR-002) — загрузка лендинга, отправка заказа, CRUD админки.

**Рекомендации:**
- Вынести слой API в отдельный модуль (например, `src/api/` или `src/services/`) с функциями `getPortfolio`, `getServices`, `createOrder` и т.д.
- Перевести DataContext на запросы к API с fallback на localStorage только для демо/оффлайн.
- Добавить переменные окружения для `API_BASE_URL` (Vite: `import.meta.env.VITE_API_BASE_URL`).

---

## 6. Безопасность и NFR

- **Админка:** Логин по коду/паролю в демо (Login.tsx). Для продакшена — заменить на Django auth (session/JWT) и вызов API.
- **Секреты:** Не хранить в коде; использовать env.
- **CORS, rate limiting:** На стороне Django (nfr-specs); фронт лишь не логирует PII в консоль.

---

## 7. Качество кода и UX

- Мемоизация (useMemo/useCallback) в DataContext, дебаунс localStorage (IMPROVEMENTS.md).
- Lazy loading админки, Reveal/AnimatedCounter/Confetti, ScrollProgress, ScrollToTop.
- Учёт `prefers-reduced-motion`, улучшенные focus states, ARIA — отражено в IMPROVEMENTS.

---

## 8. Итоговые рекомендации

| # | Действие | Приоритет |
|---|----------|-----------|
| 1 | Переименовать пакет в `hyper-development-frontend` (или аналог) в `package.json` | Средний |
| 2 | Добавить скрипты `dev`, `preview` в `package.json` | Высокий |
| 3 | Добавить `index.html` и `main.tsx` как Vite entry, если запуск не только через Make | Высокий |
| 4 | Удалить неиспользуемые MUI/Emotion или явно задокументировать использование | Низкий |
| 5 | Ввести слой API и env для `VITE_API_BASE_URL` при подключении Django | Высокий (для MVP) |
| 6 | Уточнить маппинг Order ↔ доменная модель при интеграции с бэкендом | Высокий (для MVP) |

---

## 9. Артефакты и ссылки

- **Код:** `frontend/`
- **Конфиг:** `frontend/vite.config.ts`, `frontend/package.json`
- **Документация:** `frontend/README.md`, `frontend/IMPROVEMENTS.md`
- **Проект:** `context/project-brief.yaml`, `docs/architecture/overview.md`, `docs/architecture/domain-model.md`

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-29*
