---
name: telegram-bot-api
description: Работа с Telegram Bot API — боты, webhooks, long polling, сообщения, клавиатуры, файлы. Используется при разработке/интеграции Telegram-ботов. Уровень Senior/Lead, следование Best Practices из официальной документации. Токен бота — только из окружения или по запросу пользователя, никогда в коде/репо.
---

# Telegram Bot API Skill

**Уровень:** Senior / Lead  
**Источник:** [Bot API](https://core.telegram.org/bots/api), [Bots FAQ](https://core.telegram.org/bots/faq)

## Обязательные правила (Best Practice)

### Безопасность (КРИТИЧНО)

- **Токен бота** — получать из переменных окружения (например `TELEGRAM_BOT_TOKEN`) или по явному запросу у пользователя. **Никогда** не хранить в коде, репо или логах.
- Все запросы к API — **только по HTTPS**: `https://api.telegram.org/bot<token>/METHOD_NAME`.
- При webhook: проверять источник запросов (secret path в URL или заголовок `X-Telegram-Bot-Api-Secret-Token` из `secret_token` в setWebhook).

### Запросы к API

- Поддерживаются **GET** и **POST**. Параметры: query string, `application/x-www-form-urlencoded`, `application/json` (для загрузки файлов — только `multipart/form-data`).
- Методы API **case-insensitive**. Кодировка — **UTF-8** для всех текстов.
- Ответ: JSON с полем `ok` (bool). При успехе — `result`, при ошибке — `description`, `error_code`, опционально `parameters` (в т.ч. `retry_after` при 429).

### Идентификаторы (Senior)

- **User/Chat id** могут иметь более 32 значимых бит. Хранить в **64-bit integer** или **double** (до 52 бит гарантировано).
- **file_id** уникален для каждого бота; между ботами не переносится. Один файл может иметь разные `file_id` у одного бота.

## Получение обновлений (Getting Updates)

Два **взаимоисключающих** способа:

### 1. Long Polling (getUpdates)

- Метод: `getUpdates`. Параметры: `offset`, `limit` (1–100), `timeout` (сек), `allowed_updates`.
- **Обязательно:** после каждого ответа пересчитывать `offset = last_update_id + 1`, иначе будут дубликаты.
- При активном webhook getUpdates не работает.

### 2. Webhook (setWebhook)

- URL — только **HTTPS**. Порты: **443, 80, 88, 8443**.
- Self-signed: загружать сертификат через параметр `certificate` (InputFile), не строкой.
- Рекомендуется `secret_token` (1–256 символов, A–Z, a–z, 0–9, _ -) и проверка заголовка `X-Telegram-Bot-Api-Secret-Token`.
- При ответе на webhook можно вызвать метод API отдельным POST на `https://api.telegram.org/bot<token>/method` или вернуть JSON с полем `method` в теле ответа (результат при этом узнать нельзя).

## Callback Query (обязательное правило)

После нажатия inline-кнопки клиент показывает индикатор до вызова **answerCallbackQuery**.  
**Всегда** вызывать `answerCallbackQuery` для каждого callback query — даже если уведомление пользователю не нужно (без опциональных параметров).

## Долгие операции (UX)

Когда ответ бота займёт заметное время, вызывать **sendChatAction** (например `typing`, `upload_photo`, `upload_document`) — статус показывается до 5 сек или до следующего сообщения от бота.

## Лимиты и rate limiting (FAQ)

- В одном чате: не более ~1 сообщения в секунду (кратковременные всплески допустимы, иначе 429).
- В группе: не более ~20 сообщений в минуту от бота.
- Рассылка: по умолчанию ~30 сообщений в секунду; при включённых Paid Broadcasts — до 1000/сек (списание Stars).
- При 429: в `parameters` может быть `retry_after` (секунды) — соблюдать перед повтором.

## Файлы (Sending files)

- По **file_id**: без лимита размера для повторной отправки; тип менять нельзя (видео не отправить как фото).
- По **URL**: фото до 5 MB, остальное до 20 MB; корректный MIME.
- **multipart/form-data**: фото до 10 MB, остальное до 50 MB.
- Скачивание через getFile: до 20 MB (для больших файлов — Local Bot API Server).

## Форматирование текста (formatting options)

- **parse_mode**: `HTML` или `Markdown` / `MarkdownV2`. MarkdownV2 требует экранирования спецсимволов.
- Для вложений (caption и т.д.) — те же режимы, лимит 0–1024 символа после разбора сущностей.

## Клавиатуры и ответы

- **InlineKeyboardMarkup** — кнопки под сообщением; `callback_data` 1–64 байта.
- **ReplyKeyboardMarkup** — кастомная клавиатура; не в каналах и не для сообщений от Business.
- **ForceReply** — принудительный ответ на сообщение бота (удобно при privacy mode).
- **ReplyKeyboardRemove** — убрать кастомную клавиатуру.

## Миграция группы в супергруппу

В сообщении может прийти `migrate_to_chat_id` / `migrate_from_chat_id`. Сохранять новый `chat_id` для последующих запросов (старый больше не действителен).

## Команды бота (BotCommand)

- Регистрация: **setMyCommands** (scope, language_code). Определение списка команд для пользователя — по приоритету scope (см. документацию «Determining list of commands»).
- Команда: 1–32 символа, только lowercase, цифры, подчёркивание. Описание 1–256 символов.

## Чеклист перед реализацией/деплоем бота

- [ ] Токен бота не в коде/репо — только env или запрос у пользователя
- [ ] Выбран один способ обновлений: либо getUpdates (offset после каждого ответа), либо webhook (HTTPS, порт, secret_token)
- [ ] Для каждого callback query вызывается answerCallbackQuery
- [ ] При долгой обработке вызывается sendChatAction
- [ ] User/chat id хранятся в 64-bit типах
- [ ] Учтены лимиты (1 msg/sec в чат, 20/min в группе, 30/sec рассылка или Paid Broadcasts)
- [ ] Обработка 429 и retry_after при rate limit
- [ ] Учтена миграция группы в супергруппу (migrate_to_chat_id)

## Полезные ссылки

- [Bot API](https://core.telegram.org/bots/api)
- [Bots FAQ](https://core.telegram.org/bots/faq)
- [Introduction to Bots](https://core.telegram.org/bots)
- [Webhooks guide](https://core.telegram.org/bots/webhooks)

---
*Навык создан: Orchestrator Agent | Дата: 2025-01-29*
