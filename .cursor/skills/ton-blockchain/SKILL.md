---
name: ton-blockchain
description: Работа с блокчейном TON через Ton API и Ton Console — REST API, аккаунты, кошельки, Jettons, NFT, переводы, трекинг транзакций, эмуляция, dApp, TonConnect. Используется при разработке/интеграции приложений на TON. Уровень Senior/Lead, следование Best Practices из документации docs.tonconsole.com. API-ключ — только из окружения или TonConsole, никогда в коде/репо.
---

# TON Blockchain Skill

**Уровень:** Senior / Lead  
**Источник:** [docs.tonconsole.com](https://docs.tonconsole.com/), [Ton API](https://docs.tonconsole.com/tonapi), [REST API](https://docs.tonconsole.com/tonapi/rest-api), [Cookbook](https://docs.tonconsole.com/tonapi/cookbook)

## Обязательные правила (Best Practice)

### Безопасность (КРИТИЧНО)

- **TON API ключ** — получать из переменных окружения (например `TONAPI_KEY`, `VITE_TONAPI_KEY` для фронта) или из [TonConsole](https://tonconsole.com/). **Никогда** не хранить в коде, репо или логах.
- Все запросы к API — **только по HTTPS**: mainnet `https://tonapi.io`, testnet `https://testnet.tonapi.io`.
- Мнемоника и приватные ключи — только из защищённого хранилища или окружения; в dApp подпись — через TonConnect (кошелёк пользователя), не серверная мнемоника.

### Авторизация и лимиты

- **Без токена:** 1 запрос в 4 секунды (0.24 rps). Для продакшена обязателен API-ключ.
- **Передача токена:** заголовок `Authorization: Bearer <token>`.
- Лимиты едины для всех ключей плана и для mainnet/testnet (подробности: [TonConsole Pricing](https://tonconsole.com/tonapi/pricing)).
- Для dApp в браузере Tonkeeper: при наличии `window.tonapi` клиент `@ton-api/client` автоматически использует прокси Tonkeeper — повышенные лимиты без доп. настройки. Валидный TONAPI key при инициализации клиента **обязателен** даже при использовании `window.tonapi`.

### Базовые URL

| Сеть    | Base URL              |
|---------|------------------------|
| Mainnet | `https://tonapi.io`    |
| Testnet | `https://testnet.tonapi.io` |

Выбор сети — явно по задаче (разработка/тесты vs продакшен).

## REST API: области

- **Accounts** — информация об аккаунтах, балансы, Jettons.
- **Blockchain** — блоки, транзакции, поиск по message hash (в т.ч. normalized hash для external-in).
- **Wallet** — кошельки, последовательности (seqno).
- **NFT, Jettons** — коллекции, балансы, трансферы.
- **DNS** — резолв .ton имён.
- **Rates, Staking, Traces, Events, Storage** — курсы, стейкинг, трассировки, события, хранилище.
- **Connect, Gasless, Multisig** — TonConnect, газлесс-транзакции, мультиподпись.
- **Emulation** — эмуляция транзакций до отправки в сеть.
- **Lite Server, Utilities, Inscriptions** — низкоуровневый доступ, утилиты, надписи.

Swagger: [tonapi.io/api-v2](https://tonapi.io/api-v2). OpenAPI: [GitHub openentonapi](https://github.com/tonkeeper/opentonapi) — `api/openapi.yml`.

## Cookbook: ключевые сценарии

### TON Transfer

- Мнемоника → `mnemonicToPrivateKey` (@ton/crypto). Кошелёк (например Wallet V5R1) → `ContractAdapter` из `@ton-api/ton-adapter` для работы через TON API.
- **Обязательно** получать актуальный `seqno` перед отправкой перевода (`getSeqno()`).
- `SendMode`: типично `SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS`.
- Адреса в формате raw string (EQ...) или парсить через `Address.parse()`.

### Transaction tracking (external-in)

- Для сообщений типа **external-in** хеш в блокчейне может отличаться от хеша тела. Использовать **normalized hash**: собрать ячейку с типом external-in, адресом назначения, телом как ref и брать хеш этой ячейки. Затем `getBlockchainTransactionByMessageHash(normalizedHashHex)`.
- Для internal сообщений достаточно `message.body.hash()`.

### Jetton transfer

- Операция jetton transfer: op-код `0xf8a7ea5`, query id, amount, recipient, response_destination, custom payload, forward TON amount. Использовать Cookbook/референс контрактов Jetton.
- В dApp: формировать транзакцию и отправлять через TonConnect (`sendTransaction`), не хранить приватные ключи в приложении.

### Emulation

- Перед отправкой дорогих или сложных транзакций вызывать Emulation API для проверки результата и расхода газа.

### Gasless

- Сценарии, когда комиссию платит не пользователь, а бэкенд/спонсор — через Gasless API по документации.

## dApp (React/TypeScript)

- **TonConnect:** `@tonconnect/ui-react`, провайдер с `manifestUrl` (обязательно корректный манифест).
- **TON API клиент:** `@ton-api/client`, `@ton/core`. В браузере для `@ton/core` нужен Buffer polyfill (например `vite-plugin-node-polyfills`).
- Инициализация: `new TonApiClient({ baseUrl: 'https://tonapi.io', apiKey: import.meta.env.VITE_TONAPI_KEY || undefined })`. Ключ из env, не хардкод.
- Получение балансов Jettons: `accounts.getAccountJettonsBalances(address)`.
- Отправка транзакций — только через TonConnect (подпись в кошельке пользователя); формирование payload — по стандартам Jetton/NFT (beginCell, op-коды, decimals).

## SDK и ссылки

- **SDK:** [@ton-api/client](https://www.npmjs.com/package/@ton-api/client), [@ton/core](https://www.npmjs.com/package/@ton/core), [@ton/ton](https://www.npmjs.com/package/@ton/ton), [@ton/crypto](https://www.npmjs.com/package/@ton/crypto). TonAdapter: `@ton-api/ton-adapter`.
- **TonConnect:** [docs.ton.org / Ton Connect](https://docs.ton.org/develop/dapps/ton-connect/developers).
- **Open-source нода:** [opentonapi](https://github.com/tonkeeper/opentonapi) — ограниченная версия без полного индекса (jettons/NFT/полная инфа по аккаунтам могут быть недоступны).

## Чеклист перед реализацией/деплоем

- [ ] API-ключ не в коде/репо — только env или TonConsole
- [ ] Выбрана корректная сеть (mainnet vs testnet) и baseUrl
- [ ] Для TON/Jetton переводов с сервера: актуальный seqno, корректный SendMode
- [ ] Для отслеживания транзакций по external-in: используется normalized hash
- [ ] В dApp: подпись только через TonConnect; TONAPI key в env (VITE_* для Vite)
- [ ] Учтены лимиты (без ключа 0.24 rps; с ключом — по тарифу; в Tonkeeper — автоматически повышенные при window.tonapi)
- [ ] Перед тяжёлыми/критичными транзакциями рассмотрена эмуляция
- [ ] Buffer polyfill подключен, если используется @ton/core в браузере

## Полезные ссылки

- [Documentation](https://docs.tonconsole.com/)
- [Ton API Introduction](https://docs.tonconsole.com/tonapi)
- [REST API](https://docs.tonconsole.com/tonapi/rest-api)
- [Cookbook](https://docs.tonconsole.com/tonapi/cookbook)
- [Building a TON dApp](https://docs.tonconsole.com/tonapi/dapp/building)
- [Free TONAPI limits (Tonkeeper)](https://docs.tonconsole.com/tonapi/dapp/free-limits)
- [TonConsole](https://tonconsole.com/)

---
*Навык создан: Orchestrator Agent | Дата: 2025-01-29*
