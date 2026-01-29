---
name: github-actions
description: Работа с GitHub и GitHub Actions для настройки CI/CD — workflows, secrets, API, репозитории. Используется при настройке CI/CD, пайплайнов деплоя, интеграции с VPS. Перед работой обязательно запросить у пользователя ключ доступа к GitHub-репо.
---

# GitHub & GitHub Actions Skill

**Уровень:** Senior DevOps / CI-CD
**Базовое правило:** `.cursor/rules/03-ssh-operations.mdc` (деплой через Git)

## Обязательное условие перед работой

**Перед любой работой с GitHub API, secrets, workflows или репозиторием** агент **обязан** запросить у пользователя ключ доступа к GitHub-репо:

- *«Для настройки CI/CD и работы с GitHub нужен ключ доступа к репозиторию (PAT, SSH deploy key и т.п.). Предоставь его, и я продолжу.»*

Ключ **никогда** не хранить в коде, в репо или в логах. Использовать только в рамках сессии (переменные окружения, `gh auth`, и т.д.).

## Когда применять

- Настройка CI/CD с GitHub Actions
- Создание/правка workflow-файлов в `.github/workflows/`
- Управление GitHub Actions secrets и variables
- Работа с GitHub API (репо, branches, releases)
- Интеграция деплоя на VPS с GitHub (push → Actions → deploy)

## GitHub Actions: структура

### Workflow-файлы

- Путь: `.github/workflows/<name>.yml` или `.yaml`
- Триггеры: `push`, `pull_request`, `workflow_dispatch`, `schedule`
- Jobs → steps; можно переиспользовать `workflows` через `workflow_call`

### Типовые jobs для CI/CD

```yaml
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # build, lint, test — без секретов репо
  deploy:
    needs: ci
    runs-on: ubuntu-latest
    steps:
      # деплой на VPS: SSH, rsync, или git pull на сервере
      # секреты — только через GitHub Secrets
```

### Секреты и переменные

- **Secrets:** Settings → Secrets and variables → Actions. Использовать в workflow как `${{ secrets.NAME }}`.
- **Variables:** те же Settings. Использовать как `${{ vars.NAME }}`.
- Никогда не коммитить токены/пароли — только ссылки на `secrets.*` / `vars.*`.

## Деплой на VPS через GitHub Actions

Согласовано с правилом «деплой только через Git»:

1. Код меняется только в репо (локально: commit + push).
2. На VPS — только `git pull` (или `fetch` + `checkout`) в каталоге проекта, далее build/restart и т.д.

Варианты реализации в Actions:

- **SSH + git pull:** сохранить SSH-ключ в `secrets.VPS_SSH_KEY`, подключаться по SSH и выполнять `cd <project> && git pull && ...`.
- **Deploy key:** отдельный ключ с доступом только на чтение/клонирование репо, на VPS — `git pull` по расписанию или по webhook.

## GitHub CLI (`gh`)

```bash
# авторизация (токен — по запросу у пользователя, не в репо)
gh auth login

# репо
gh repo list
gh repo clone owner/repo

# workflow
gh workflow list
gh workflow run <name>
gh run list
gh run view <id>

# secrets (только имена, не значения)
gh secret list
```

## Полезные ссылки

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## Чеклист перед изменением CI/CD

- [ ] Ключ доступа к GitHub запрошен и получен от пользователя
- [ ] Секреты не попадают в код/репо — только `secrets.*` в workflow
- [ ] Деплой на VPS идёт через Git (push → pull на сервере), не через заливку файлов минуя репо
- [ ] Workflow-файлы в `.github/workflows/` под версионным контролем

---
*Навык создан: Orchestrator Agent | Дата: 2025-01-29*
