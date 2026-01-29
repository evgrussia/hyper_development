---
name: telegram-core-api
description: Работа с Telegram Core API (MTProto) — кастомные клиенты, авторизация пользователей, вызов методов, обновления, дата-центры, файлы. Используется при разработке клиентов на MTProto/TDLib (не Bot API). Уровень Senior/Lead, соблюдение Best Practice и Security Guidelines из официальной документации. api_id/api_hash — только из окружения или по запросу пользователя, никогда в коде/репо.
---

# Telegram Core API (MTProto) Skill

**Уровень:** Senior / Lead  
**Источник:** [Telegram API](https://core.telegram.org/api), [MTProto](https://core.telegram.org/mtproto), [Security Guidelines](https://core.telegram.org/mtproto/security_guidelines)

**Отличие от Bot API:** Core API — для построения **собственных клиентов** (user/bot через MTProto), низкоуровневый протокол. Bot API — HTTPS, упрощённый, только боты. Для ботов по HTTPS используй навык `telegram-bot-api`.

## Обязательные правила (Best Practice)

### Безопасность (КРИТИЧНО)

- **api_id и api_hash** — получать из переменных окружения (например `TELEGRAM_API_ID`, `TELEGRAM_API_HASH`) или по явному запросу у пользователя. **Никогда** не хранить в коде, репо или логах.
- Использовать **MTProto 2.0**; MTProto 1.0 устарел.
- Соблюдать [Security Guidelines](https://core.telegram.org/mtproto/security_guidelines):
  - **DH:** проверять, что `p = dh_prime` — безопасное 2048-битное простое; проверять `g_a`, `g_b` в допустимых границах; проверять SHA1 при генерации ключа; проверять nonce/server_nonce/new_nonce; использовать криптостойкий PRNG для `a`/`b`.
  - **Шифрованные сообщения:** после расшифровки **обязательно** проверять `msg_key` (SHA256 от plaintext + 32 байта auth_key); проверять длину сообщения и padding (12–1024 байт); проверять `session_id`; проверять `msg_id` (чётность client→server / нечётность server→client, отклонять дубликаты и сообщения вне окна ±30 с / 300 с).
- При несовпадении проверок — отбрасывать сообщение, закрывать TCP, переустанавливать соединение и повторять операцию.

### Регистрация приложения и авторизация

- **api_id/api_hash:** получать на [my.telegram.org](https://my.telegram.org) → API development tools. Один номер — один api_id. Для продакшена **обязательно** свой api_id; тестовый из исходников ограничен и даёт API_ID_PUBLISHED_FLOOD.
- **Авторизация:** `auth.sendCode` → пользователь вводит код → `auth.signIn` или `auth.signUp`. При 2FA — [SRP](https://core.telegram.org/api/srp). Поддержать **future auth tokens** (хранить до 20, передавать в `codeSettings.logout_tokens` при `auth.sendCode`) для быстрого входа без SMS.
- **Тестовые аккаунты:** номера вида `99966XYYYY` (X=1–3) — тестовые DC; код подтверждения `XXXXX`. Не хранить важные данные в тестовых аккаунтах.
- После входа — сохранять связь `auth_key_id` ↔ User ID локально. Только ограниченный набор методов доступен без авторизации; остальные возвращают **401 UNAUTHORIZED**.

### Обработка ошибок

- Ошибка: код (число) + тип (строка, например `FLOOD_WAIT_%d`). Полный список: [Error Database](https://core.telegram.org/api/errors#error-database).
- **303 SEE_OTHER:** редирект в другой DC. Обрабатывать `FILE_MIGRATE_X`, `PHONE_MIGRATE_X`, `NETWORK_MIGRATE_X`, `USER_MIGRATE_X` — повторять запрос в указанном DC (X — номер DC).
- **400 BAD_REQUEST:** исправить входные данные (например PHONE_CODE_EXPIRED, API_ID_INVALID).
- **401 UNAUTHORIZED:** ключ не зарегистрирован/невалиден, сессия отозвана/истекла — переавторизация.
- **403 FORBIDDEN:** нарушение правил доступа (например, пользователь в чёрном списке).
- **406 NOT_ACCEPTABLE:** не показывать ошибку пользователю сразу; ждать `updateServiceNotification` с текстом для UI. Исключение: `AUTH_KEY_DUPLICATED` — сессия уже инвалидирована, нужна новая авторизация.
- **420 FLOOD:** `FLOOD_WAIT_X` — ждать X секунд перед повтором; `FLOOD_PREMIUM_WAIT_X` — аналогично, возможно снять лимит через Premium.
- **500 INTERNAL:** повтор с экспоненциальной задержкой; при повторяющихся сбоях — сообщить разработчикам.

### Дата-центры (DC)

- Список DC: `help.getConfig` → `dc_options`. Подключаться к **ближайшему** DC для основных запросов.
- Файлы привязаны к DC: у объекта есть `dc_id`; скачивание — только через соединение с этим DC. При ошибке `FILE_MIGRATE_X` — подключиться к DC X и повторить.
- **Перенос авторизации между DC:** `auth.exportAuthorization` в текущем DC с `dc_id` целевого → на новом DC вызвать `auth.importAuthorization` с полученными `id` и `bytes`. Ключи между DC не копируются.

### Вызов методов (Invoking)

- **Слой (layer):** версионирование через TL layers. Первый вызов после старта/смены параметров: обернуть в `invokeWithLayer` и вызвать **initConnection** (параметры клиента). После этого слой сохраняется, оборачивать каждый вызов не обязательно.
- **initConnection** обязателен после перезапуска и после каждого `auth.bindTempAuthKey`.
- **Порядок запросов:** для строгой очерёдности использовать `invokeAfterMsg` / `invokeAfterMsgs`. При `MSG_WAIT_TIMEOUT` или `MSG_WAIT_FAILED` — повторять запрос с актуальными msg_id (см. [invoking](https://core.telegram.org/api/invoking)). `invokeAfterMsg`/`invokeAfterMsgs` — всегда внешняя обёртка относительно других хелперов.
- **Без подписки на updates:** `invokeWithoutUpdates` — для запросов, которые не должны подписывать соединение на обновления (по умолчанию для файловых запросов так и есть).
- **Сжатие:** для тел запросов/ответов > 255 байт (и не бинарные медиа) использовать gzip (`gzip_packed`); сервер так же может возвращать сжатое.

### Обновления (Updates)

- Обновления приходят по **последнему активному** соединению (кроме файловых). Игнорировать обновления до завершения handshake и до авторизации (кроме разрешённых: updateLangPack*, updateConfig, updateDcOptions, updateSentPhoneCode, updateLoginToken).
- **Последовательности:** общая (seq), общий message box (pts), вторичная (qts), для каждого канала/супергруппы — свой pts. Применять обновления в порядке, проверяя локальное состояние по seq/pts/qts; при пропуске — вызывать `updates.getDifference` или `updates.getChannelDifference`.
- **Восстановление пробелов:** при `updatesTooLong` / `updateChannelTooLong`, после долгого отсутствия (>15 мин), при неполном/некорректном обновлении, при потере сессии на сервере или при обнаружении пропуска в seq/pts/qts — заполнять через `updates.getDifference` (общее/секретное) или `updates.getChannelDifference` (канал). При `updates.differenceSlice` / незавершённом channel difference — сохранять промежуточное состояние и повторять запрос.
- Для каналов/супергрупп, которые пользователь **открыл**, дополнительно периодически вызывать `updates.getChannelDifference` (не более 10 каналов одновременно); при возврате `channelDifferenceTooLong` — следовать инструкциям из документации.

### Оптимизация (Lead)

- **Быстрое подтверждение доставки:** использовать quick ack от сервера; при отсутствии ответа — сверять по `updateMessageID` при следующем `updates.getDifference`.
- **Server salt:** срок жизни ~1 час; заранее запрашивать `get_future_salts` и использовать соль с максимальным оставшимся временем.
- **Файлы:** отдельные соединения/пул для загрузки и скачивания; несколько параллельных запросов по одному соединению (не ждать ответа перед следующим запросом) для снижения влияния пинга.
- **Массовая отправка сообщений:** явно задавать порядок через `invokeAfterMsg` / `invokeAfterMsgs`, чтобы сервер выполнял запросы в нужном порядке.
- **Группировка обновлений:** при долгом отсутствии соединения сервер может объединять обновления; управление моментом «потери» соединения — через `ping_delay_disconnect`.
- **messages.setTyping** вызывать только если контакт онлайн.

### Terms of Service и ограничения

- Соблюдать [API Terms of Service](https://core.telegram.org/api/terms). За флуд, спам, накрутку счётчиков — **перманентный бан**.
- Аккаунты, входящие через неофициальные клиенты, могут находиться под наблюдением. При необоснованном бане — писать на recover@telegram.org (ручная проверка; автоматические письма не допускаются).
- Замороженные аккаунты: только чтение; ошибки `FROZEN_METHOD_INVALID`, `FROZEN_PARTICIPANT_MISSING`. Получить `help.getAppConfig` для `freeze_since_date`, `freeze_until_date`, `freeze_appeal_url`.

## Ссылки на документацию

- [API Overview](https://core.telegram.org/api)
- [Creating application](https://core.telegram.org/api/obtaining_api_id)
- [User authorization](https://core.telegram.org/api/auth)
- [Error handling](https://core.telegram.org/api/errors)
- [Data centers](https://core.telegram.org/api/datacenter)
- [Calling methods](https://core.telegram.org/api/invoking)
- [Updates](https://core.telegram.org/api/updates)
- [Security guidelines](https://core.telegram.org/mtproto/security_guidelines)
- [Client optimisation](https://core.telegram.org/api/optimisation)
- [Methods list](https://core.telegram.org/methods)
- [TL Schema (JSON)](https://core.telegram.org/schema/json)

---
*Документ создан: Orchestrator Agent | Дата: 2025-01-29*
