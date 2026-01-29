# Профили агентов (субагенты)

Тексты профилей агентов хранятся прямо в `.cursor/agents/*.md`.

## Доступные роли

- `orchestrator` → `.cursor/agents/orchestrator.md`
- `product` → `.cursor/agents/product.md`
- `research` → `.cursor/agents/research.md`
- `analytics` → `.cursor/agents/analytics.md`
- `ux` → `.cursor/agents/ux.md`
- `ui` → `.cursor/agents/ui.md`
- `content` → `.cursor/agents/content.md`
- `architect` → `.cursor/agents/architect.md`
- `data` → `.cursor/agents/data.md`
- `security` → `.cursor/agents/security.md`
- `dev` → `.cursor/agents/dev.md`
- `coder` → `.cursor/agents/coder.md` 🖥️
- `qa` → `.cursor/agents/qa.md` 🖥️
- `review` → `.cursor/agents/review.md`
- `devops` → `.cursor/agents/devops.md` 🖥️
- `sre` → `.cursor/agents/sre.md` 🖥️
- `marketing` → `.cursor/agents/marketing.md`
- `ai-agents` → `.cursor/agents/ai-agents.md`
- `business-analyst` → `.cursor/agents/business-analyst.md`

## Агенты с SSH-доступом к VPS 🖥️

Следующие агенты могут выполнять задачи на удалённых VPS серверах (Ubuntu 24.04) через SSH:

| Агент | Права | Типичные задачи |
|-------|-------|-----------------|
| **DevOps** | Полный | Деплой, настройка инфраструктуры, CI/CD |
| **SRE** | Полный | Мониторинг, диагностика, incident response |
| **QA** | Deploy + Verify | Deployment testing, smoke tests, logs |
| **Coder** | По запросу | Debug на сервере, hotfix |

**Навык:** `.cursor/skills/ssh-deployment/SKILL.md`
**Навык (CI/CD):** `.cursor/skills/github-actions/SKILL.md` — перед работой запросить ключ доступа к GitHub-репо.
**Правила:** `.cursor/rules/03-ssh-operations.mdc`

