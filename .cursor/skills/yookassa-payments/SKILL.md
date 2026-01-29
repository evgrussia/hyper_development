---
name: yookassa-payments
description: Приём платежей в рублях через YooKassa (YooMoney API) — создание платежей, подтверждение, возвраты, уведомления, чеки 54-ФЗ. Используется при разработке/интеграции оплаты в веб и мобильных приложениях. Уровень Senior/Lead, следование Best Practices из официальной документации. Shop ID и Secret Key — только из окружения или по запросу пользователя, никогда в коде/репо.
---

# YooKassa (YooMoney API) Payments Skill

**Уровень:** Senior / Lead  
**Источник:** [YooMoney API](https://yookassa.ru/developers), [Using SDKs](https://yookassa.ru/developers/using-api/using-sdks), [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start), [API Reference](https://yookassa.ru/developers/api)

## Обязательные правила (Best Practice)

### Безопасность (КРИТИЧНО)

- **Shop ID и Secret Key** — получать из переменных окружения (например `YOOKASSA_SHOP_ID`, `YOOKASSA_SECRET_KEY`) или по явному запросу у пользователя. **Никогда** не хранить в коде, репо или логах.
- Все запросы к API — **только по HTTPS**: `https://api.yookassa.ru/v3/`.
- Аутентификация: **HTTP Basic Auth** — в заголовке `Authorization` передавать Shop ID как username и Secret Key как password. Для партнёрского API — OAuth 2.0 (Bearer token).
- При обработке webhook: проверять подлинность уведомления (текущий статус объекта через GET и/или IP-адреса отправителя из документации).

### Идемпотентность (ОБЯЗАТЕЛЬНО)

- Для **POST и DELETE** запросов **всегда** передавать заголовок **`Idempotence-Key`** (до 64 символов). Рекомендуется UUID v4.
- Повтор запроса с тем же ключом и теми же данными в течение 24 часов возвращает результат первого запроса и не создаёт дубликат операции.
- При сетевой ошибке или HTTP 500 — повторять запрос с **тем же** Idempotence-Key и теми же данными. При 4XX — исправлять данные и использовать **новый** ключ.

### Формат взаимодействия с API

- **Endpoint:** `https://api.yookassa.ru/v3/`
- **Методы:** POST (тело JSON), GET и DELETE (query string). Ответ всегда в JSON.
- **Content-Type:** `application/json` для POST с телом.

### Обработка ответов (General recommendations)

1. **HTTP 200** и статус объекта `succeeded` (или иной финальный успешный) — операция успешна.
2. **HTTP 200** и статус `pending` — результат ещё неизвестен. Ждать уведомление (webhook) или периодически запрашивать GET; при отсутствии изменений — повторять запрос с тем же Idempotence-Key с растущим интервалом (например, последовательность Фибоначчи).
3. **HTTP 200** и статус `canceled` (или иной финальный неуспешный) — операция не выполнена. Анализировать причину; при необходимости запрашивать новые данные у пользователя и повторять с новым Idempotence-Key.
4. **HTTP 4XX** — ошибка запроса. Анализировать причину, исправлять данные, повторять с новым Idempotence-Key.
5. **HTTP 500** — результат обработки неизвестен. **Не** считать платёж ни успешным, ни неуспешным. Повторять запрос с тем же Idempotence-Key или GET по объекту; при отсутствии изменений — повтор с растущим интервалом.

### Создание платежа (Quick start / Payment process)

- Обязательные параметры: `amount` (value в строке, например `"100.00"`, `currency`: `"RUB"`), `confirmation` (например `type: "redirect"`, `return_url`), при одностадийном списании — `capture: true`.
- `description` — до 128 символов, опционально.
- `metadata` — произвольные ключ-значение для связи с заказом (например `order_id`); возвращаются в ответах без изменений.
- Запросы к API создавать **только с сервера**; не передавать Secret Key на клиент.

### Подтверждение платежа пользователем

- Для сценария **Redirect**: после создания платежа перенаправлять пользователя на `confirmation.confirmation_url`; после оплаты YooKassa вернёт пользователя на `return_url`.
- Статусы: `pending` → (после подтверждения) `succeeded` или `waiting_for_capture` (двустадийный) или `canceled`.

### Двустадийные платежи (capture)

- Создание с `capture: false` → после подтверждения пользователем статус `waiting_for_capture`. Затем: **capture** (полный или частичный) или **cancel**. Срок на capture ограничен (зависит от способа оплаты), иначе платёж отменяется с причиной `expired_on_capture`.

### Уведомления (Webhooks)

- Настраиваются в личном кабинете: [Интеграция — HTTP-уведомления](https://yookassa.ru/my/http-notifications-settings). URL — только **HTTPS**, порты 443 или 8443; TLS 1.2+.
- События: `payment.waiting_for_capture`, `payment.succeeded`, `payment.canceled`, `refund.succeeded` и др. (см. документацию по событиям).
- Тело уведомления: `type: "notification"`, `event`, `object` (полный объект платежа/возврата на момент события).
- **Обязательно** отвечать на webhook кодом **HTTP 200**, иначе YooKassa будет повторять отправку до 24 часов.
- Проверка подлинности: запросить текущее состояние объекта через GET по API и/или проверять IP отправителя (диапазоны указаны в документации).

### SDK и сценарии интеграции

- **Сервер:** официальные SDK — PHP, Python; сообщество — Node.js (@a2seven/yoo-checkout), .NET. При отсутствии SDK — использовать [OpenAPI-спецификацию](https://yookassa.ru/developers/using-api/openapi-specification).
- **Веб:** YooMoney Checkout Widget (много способов оплаты) или Checkout.js (только банковские карты, токен для создания платежа).
- **Мобильные:** iOS SDK, Android SDK (токенизация данных, платёж создаётся на сервере с токеном).
- Валюта платежей в рублях — **RUB**.

### Возвраты (Refunds)

- Возврат возможен для платежа в статусе `succeeded`. Запрос на создание возврата — POST с **Idempotence-Key**, `payment_id`, `amount` (value, currency). Статус возврата отслеживать по уведомлению `refund.succeeded` или GET.

### Чеки 54-ФЗ

- При необходимости передавать данные для чека в запросе создания платежа/возврата согласно разделу [Receipts for the Tax Service](https://yookassa.ru/developers/payment-acceptance/receipts/basics). Параметры и значения — по документации YooMoney / сторонней ОФД.

### Тестовый режим

- Демо-магазин и тестовый секретный ключ — в личном кабинете. Тестовые карты и сценарии описаны в [Testing](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing). Для приёма реальных платежей использовать ID и ключ реального магазина.

## Чеклист перед реализацией/деплоем

- [ ] Shop ID и Secret Key не в коде/репо — только env или запрос у пользователя
- [ ] Все POST/DELETE к API отправляются с заголовком Idempotence-Key (например UUID v4)
- [ ] Обработка HTTP 500: повтор с тем же Idempotence-Key, без двойного списания/возврата
- [ ] Обработка статусов: pending → ожидание webhook или GET; succeeded/canceled — соответствующие действия в приложении
- [ ] Webhook endpoint отвечает HTTP 200; при необходимости проверяется подлинность (GET объекта и/или IP)
- [ ] Запросы к API выполняются только с сервера
- [ ] Суммы в рублях: currency `"RUB"`, value — строка с двумя знаками после запятой
- [ ] Учтён сценарий подтверждения (redirect/embedded/external и т.д.) и return_url

## Полезные ссылки

- [Using SDKs](https://yookassa.ru/developers/using-api/using-sdks)
- [Interaction format](https://yookassa.ru/developers/using-api/interaction-format)
- [Response handling: recommendations](https://yookassa.ru/developers/using-api/response-handling/recommendations)
- [Notifications (Webhooks)](https://yookassa.ru/developers/using-api/webhooks)
- [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start)
- [Payment process](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process)
- [API Reference](https://yookassa.ru/developers/api)

---
*Навык создан: Orchestrator Agent | Дата: 2025-01-29*
