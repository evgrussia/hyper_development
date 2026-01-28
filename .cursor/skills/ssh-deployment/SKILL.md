---
name: ssh-deployment
description: SSH операции на VPS серверах Ubuntu 24.04 (dev/production). Подключение, деплой приложений, управление сервисами, проверка логов, rollback. Senior/Lead уровень. Используется QA, DevOps, SRE и Coder агентами.
---

# SSH Deployment Skill

**Уровень:** Senior / Lead DevOps Engineer
**Платформа:** Ubuntu 24.04 LTS
**Базовое правило:** `.cursor/rules/03-ssh-operations.mdc`

## Обзор

Навык для выполнения SSH-операций на VPS серверах. Позволяет:
- Подключаться к dev/production серверам
- Деплоить приложения
- Управлять сервисами (Docker, systemd)
- Проверять логи и состояние
- Выполнять rollback

## Конфигурация серверов

### Рекомендуемая структура конфига

```yaml
# config/servers.yaml (НЕ коммитить в репозиторий!)
servers:
  dev:
    host: "dev.example.com"
    user: "deploy"
    port: 22
    identity_file: "~/.ssh/id_rsa_dev"
    project_path: "/var/www/app"
    services:
      - "docker-compose"  # или "systemd"
    
  production:
    host: "prod.example.com"
    user: "deploy"
    port: 22
    identity_file: "~/.ssh/id_rsa_prod"
    project_path: "/var/www/app"
    services:
      - "docker-compose"
    requires_confirmation: true  # ВАЖНО: требует подтверждения
```

### SSH Config (рекомендуется)

```bash
# ~/.ssh/config
Host dev-server
    HostName dev.example.com
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa_dev
    StrictHostKeyChecking accept-new

Host prod-server
    HostName prod.example.com
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa_prod
    StrictHostKeyChecking accept-new
```

## Базовые SSH-команды

### Подключение и проверка

```bash
# Проверка доступности сервера
ssh -o ConnectTimeout=5 dev-server "echo 'Connection OK'"

# Проверка версии приложения
ssh dev-server "cd /var/www/app && git rev-parse --short HEAD"

# Проверка статуса сервисов
ssh dev-server "cd /var/www/app && docker-compose ps"
```

### Просмотр логов

```bash
# Docker logs (последние 100 строк)
ssh dev-server "cd /var/www/app && docker-compose logs --tail=100 app"

# Следить за логами в реальном времени
ssh dev-server "cd /var/www/app && docker-compose logs -f app"

# Systemd журнал
ssh dev-server "journalctl -u myapp.service -n 100 --no-pager"

# Файловые логи
ssh dev-server "tail -100 /var/log/app/error.log"
```

## Сценарии деплоя

### Сценарий 1: Docker Compose деплой

```bash
#!/bin/bash
# scripts/deploy-docker.sh
set -e

SERVER="${1:-dev-server}"
PROJECT_PATH="${2:-/var/www/app}"
BRANCH="${3:-main}"

echo "=== Deploying to $SERVER ==="

# 1. Подключение и обновление кода
ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    echo ">>> Fetching latest code..."
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
    
    echo ">>> Current commit:"
    git log -1 --oneline
EOF

# 2. Build и restart
ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    echo ">>> Building containers..."
    docker-compose build --no-cache
    
    echo ">>> Stopping old containers..."
    docker-compose down
    
    echo ">>> Starting new containers..."
    docker-compose up -d
    
    echo ">>> Waiting for services..."
    sleep 10
    
    echo ">>> Container status:"
    docker-compose ps
EOF

# 3. Health check
ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    echo ">>> Running health check..."
    curl -sf http://localhost:3000/health || exit 1
    echo "Health check passed!"
EOF

echo "=== Deployment complete ==="
```

### Сценарий 2: Systemd деплой (Node.js/Python)

```bash
#!/bin/bash
# scripts/deploy-systemd.sh
set -e

SERVER="${1:-dev-server}"
PROJECT_PATH="${2:-/var/www/app}"
SERVICE_NAME="${3:-myapp}"
BRANCH="${4:-main}"

echo "=== Deploying $SERVICE_NAME to $SERVER ==="

ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    echo ">>> Fetching latest code..."
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
    
    echo ">>> Installing dependencies..."
    npm ci --production  # или: pip install -r requirements.txt
    
    echo ">>> Building..."
    npm run build  # если нужно
    
    echo ">>> Restarting service..."
    sudo systemctl restart $SERVICE_NAME
    
    echo ">>> Checking status..."
    sleep 5
    sudo systemctl status $SERVICE_NAME --no-pager
    
    echo ">>> Health check..."
    curl -sf http://localhost:3000/health || exit 1
EOF

echo "=== Deployment complete ==="
```

### Сценарий 3: Zero-downtime деплой (Docker)

```bash
#!/bin/bash
# scripts/deploy-zero-downtime.sh
set -e

SERVER="${1:-prod-server}"
PROJECT_PATH="${2:-/var/www/app}"

echo "=== Zero-downtime deployment to $SERVER ==="

ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    # Получаем новый код
    git fetch origin
    git pull origin main
    
    # Собираем новый образ
    docker-compose build app
    
    # Запускаем новый контейнер параллельно
    docker-compose up -d --no-deps --scale app=2 --no-recreate app
    
    # Ждём готовности нового контейнера
    sleep 15
    
    # Проверяем health
    curl -sf http://localhost:3000/health || exit 1
    
    # Останавливаем старый контейнер
    docker-compose up -d --no-deps --scale app=1 --no-recreate app
    
    echo "Deployment complete!"
EOF
```

## Rollback процедуры

### Docker Compose Rollback

```bash
#!/bin/bash
# scripts/rollback-docker.sh
set -e

SERVER="${1:-dev-server}"
PROJECT_PATH="${2:-/var/www/app}"
COMMIT="${3}"  # Если не указан - откат на 1 коммит

echo "=== Rolling back on $SERVER ==="

ssh $SERVER << EOF
    set -e
    cd $PROJECT_PATH
    
    if [ -n "$COMMIT" ]; then
        echo ">>> Rolling back to commit: $COMMIT"
        git checkout $COMMIT
    else
        echo ">>> Rolling back to previous commit"
        git checkout HEAD~1
    fi
    
    echo ">>> Current commit:"
    git log -1 --oneline
    
    echo ">>> Rebuilding and restarting..."
    docker-compose build --no-cache
    docker-compose down
    docker-compose up -d
    
    sleep 10
    
    echo ">>> Health check..."
    curl -sf http://localhost:3000/health || exit 1
    
    echo ">>> Container status:"
    docker-compose ps
EOF

echo "=== Rollback complete ==="
```

### Database Rollback (если есть миграции)

```bash
# Откат последней миграции
ssh $SERVER "cd /var/www/app && npm run migrate:down"

# Или для конкретной версии
ssh $SERVER "cd /var/www/app && npm run migrate:to 20240101120000"
```

## Health Checks и верификация

### Базовые проверки после деплоя

```bash
#!/bin/bash
# scripts/verify-deployment.sh

SERVER="${1:-dev-server}"
APP_URL="${2:-http://localhost:3000}"

echo "=== Verifying deployment on $SERVER ==="

# 1. Проверка что контейнеры запущены
echo ">>> Checking containers..."
ssh $SERVER "docker-compose ps" | grep -q "Up" || {
    echo "ERROR: Containers not running!"
    exit 1
}

# 2. Health endpoint
echo ">>> Checking health endpoint..."
ssh $SERVER "curl -sf $APP_URL/health" || {
    echo "ERROR: Health check failed!"
    exit 1
}

# 3. Проверка базовой функциональности
echo ">>> Checking API response..."
ssh $SERVER "curl -sf $APP_URL/api/status" || {
    echo "WARNING: API status endpoint failed"
}

# 4. Проверка логов на ошибки
echo ">>> Checking for errors in logs..."
ERROR_COUNT=$(ssh $SERVER "docker-compose logs --tail=50 app 2>&1 | grep -c 'ERROR\|FATAL'" || echo "0")
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo "WARNING: Found $ERROR_COUNT errors in recent logs"
fi

# 5. Проверка ресурсов
echo ">>> Checking resources..."
ssh $SERVER "docker stats --no-stream --format 'CPU: {{.CPUPerc}}, MEM: {{.MemUsage}}'"

echo "=== Verification complete ==="
```

### Smoke Tests после деплоя

```bash
#!/bin/bash
# scripts/smoke-tests.sh

SERVER="${1:-dev-server}"
BASE_URL="${2:-http://localhost:3000}"

echo "=== Running smoke tests on $SERVER ==="

FAILED=0

# Test 1: Homepage
echo -n "Testing homepage... "
if ssh $SERVER "curl -sf $BASE_URL/ > /dev/null"; then
    echo "OK"
else
    echo "FAILED"
    ((FAILED++))
fi

# Test 2: API health
echo -n "Testing API health... "
if ssh $SERVER "curl -sf $BASE_URL/api/health > /dev/null"; then
    echo "OK"
else
    echo "FAILED"
    ((FAILED++))
fi

# Test 3: Database connection
echo -n "Testing database... "
if ssh $SERVER "curl -sf $BASE_URL/api/health/db > /dev/null"; then
    echo "OK"
else
    echo "FAILED"
    ((FAILED++))
fi

# Test 4: Static assets
echo -n "Testing static assets... "
if ssh $SERVER "curl -sf $BASE_URL/favicon.ico > /dev/null"; then
    echo "OK"
else
    echo "FAILED"
    ((FAILED++))
fi

echo "=== Smoke tests complete: $FAILED failures ==="
exit $FAILED
```

## Мониторинг и диагностика

### Проверка ресурсов сервера

```bash
# CPU и память
ssh dev-server "top -bn1 | head -20"

# Диск
ssh dev-server "df -h"

# Docker ресурсы
ssh dev-server "docker system df"

# Сетевые соединения
ssh dev-server "netstat -tuln | grep LISTEN"
```

### Просмотр процессов

```bash
# Все процессы приложения
ssh dev-server "ps aux | grep node"

# Docker процессы
ssh dev-server "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
```

## Безопасность

### Критические правила

1. **НИКОГДА** не храните пароли в скриптах
2. **ИСПОЛЬЗУЙТЕ** SSH-ключи вместо паролей
3. **ОГРАНИЧИВАЙТЕ** права пользователя deploy (только необходимые sudo команды)
4. **ЛОГИРУЙТЕ** все деплой-операции
5. **ТРЕБУЙТЕ подтверждение** для production деплоя

### Рекомендуемый sudoers для deploy пользователя

```bash
# /etc/sudoers.d/deploy
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart myapp
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl status myapp
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl stop myapp
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl start myapp
deploy ALL=(ALL) NOPASSWD: /usr/bin/docker-compose *
```

### Audit logging

```bash
# Логирование SSH-сессий
ssh $SERVER "logger -t DEPLOY 'Deployment started by $USER'"

# В конце скрипта
ssh $SERVER "logger -t DEPLOY 'Deployment completed: $(git rev-parse --short HEAD)'"
```

## Интеграция с агентами

### QA Agent использование

QA Agent использует этот навык для:
- Деплоя на dev-окружение для тестирования
- Верификации деплоя (smoke tests, health checks)
- Проверки логов после деплоя
- E2E тестирования на staging/dev

### DevOps Agent использование

DevOps Agent использует для:
- Настройки CI/CD скриптов
- Production деплоя
- Инфраструктурных операций

### SRE Agent использование

SRE Agent использует для:
- Rollback при инцидентах
- Диагностики проблем
- Мониторинга состояния

## Quick Reference

### Частые команды

| Задача | Команда |
|--------|---------|
| Проверить соединение | `ssh dev-server "echo OK"` |
| Статус контейнеров | `ssh dev-server "docker-compose ps"` |
| Логи (последние 100) | `ssh dev-server "docker-compose logs --tail=100"` |
| Перезапуск | `ssh dev-server "docker-compose restart"` |
| Полный редеплой | `./scripts/deploy-docker.sh dev-server` |
| Health check | `ssh dev-server "curl -s localhost:3000/health"` |
| Rollback | `./scripts/rollback-docker.sh dev-server` |

### Чеклист перед деплоем на Production

- [ ] Все тесты прошли на dev/staging
- [ ] Code review пройден
- [ ] Database миграции проверены
- [ ] Rollback план готов
- [ ] Мониторинг настроен
- [ ] Команда уведомлена
- [ ] Бэкап базы сделан (если нужно)

## Ubuntu 24.04 LTS: Senior/Lead практики

### Первоначальная настройка сервера

```bash
#!/bin/bash
# scripts/server-initial-setup.sh
# Выполнять от root или с sudo

set -e

echo "=== Ubuntu 24.04 Server Setup (Senior Level) ==="

# 1. Обновление системы
apt update && apt upgrade -y

# 2. Установка базовых пакетов
apt install -y \
    curl wget git htop iotop \
    unzip zip \
    ufw fail2ban \
    nginx \
    certbot python3-certbot-nginx

# 3. Настройка firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 4. Настройка fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 5. Создание deploy пользователя
useradd -m -s /bin/bash deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
# Публичный ключ добавить вручную

# 6. Настройка sudo для deploy
echo "deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl, /usr/bin/docker, /usr/bin/docker-compose" > /etc/sudoers.d/deploy

# 7. Настройка SSH (hardening)
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
systemctl restart sshd

echo "=== Setup complete ==="
```

### Установка Docker (Ubuntu 24.04)

```bash
#!/bin/bash
# scripts/install-docker-ubuntu24.sh
set -e

echo "=== Installing Docker on Ubuntu 24.04 ==="

# Удаление старых версий
apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Установка зависимостей
apt update
apt install -y ca-certificates curl gnupg

# Добавление GPG ключа Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Добавление репозитория
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Добавление пользователя в группу docker
usermod -aG docker deploy

# Запуск и автозапуск
systemctl enable docker
systemctl start docker

# Проверка
docker --version
docker compose version

echo "=== Docker installed successfully ==="
```

### Установка Node.js (через nvm)

```bash
#!/bin/bash
# scripts/install-nodejs.sh
set -e

NODE_VERSION="${1:-20}"  # LTS версия по умолчанию

echo "=== Installing Node.js $NODE_VERSION ==="

# Установка nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Загрузка nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Установка Node.js
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION

# Глобальные пакеты
npm install -g pm2 yarn

# Проверка
node --version
npm --version

echo "=== Node.js installed ==="
```

### Создание systemd сервиса

```bash
#!/bin/bash
# scripts/create-systemd-service.sh
# Usage: ./create-systemd-service.sh myapp /var/www/app 3000

APP_NAME="${1:-myapp}"
APP_PATH="${2:-/var/www/app}"
APP_PORT="${3:-3000}"
APP_USER="${4:-deploy}"

cat > /etc/systemd/system/$APP_NAME.service << EOF
[Unit]
Description=$APP_NAME Node.js Application
Documentation=https://example.com
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_PATH
Environment=NODE_ENV=production
Environment=PORT=$APP_PORT
ExecStart=/usr/bin/node dist/main.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=$APP_NAME

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_PATH/logs $APP_PATH/uploads
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable $APP_NAME
echo "Service $APP_NAME created. Start with: systemctl start $APP_NAME"
```

### Настройка Nginx reverse proxy

```bash
#!/bin/bash
# scripts/setup-nginx-proxy.sh
# Usage: ./setup-nginx-proxy.sh myapp.example.com 3000

DOMAIN="${1:-app.example.com}"
PORT="${2:-3000}"
APP_NAME=$(echo $DOMAIN | cut -d. -f1)

cat > /etc/nginx/sites-available/$APP_NAME << EOF
# Rate limiting zone
limit_req_zone \$binary_remote_addr zone=${APP_NAME}_limit:10m rate=10r/s;

upstream ${APP_NAME}_backend {
    server 127.0.0.1:$PORT;
    keepalive 64;
}

server {
    listen 80;
    server_name $DOMAIN;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;
    
    # SSL certificates (certbot will configure)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL configuration (Mozilla Modern)
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Logging
    access_log /var/log/nginx/${APP_NAME}.access.log;
    error_log /var/log/nginx/${APP_NAME}.error.log;
    
    # Rate limiting
    limit_req zone=${APP_NAME}_limit burst=20 nodelay;
    
    location / {
        proxy_pass http://${APP_NAME}_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 90;
    }
    
    # Health check endpoint (no rate limit)
    location /health {
        limit_req off;
        proxy_pass http://${APP_NAME}_backend;
    }
    
    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "Nginx configured for $DOMAIN"
echo "Run: certbot --nginx -d $DOMAIN"
```

### SSL сертификат (Let's Encrypt)

```bash
# Получение сертификата
sudo certbot --nginx -d example.com -d www.example.com --non-interactive --agree-tos -m admin@example.com

# Автоматическое обновление (уже настроено через systemd timer)
systemctl status certbot.timer

# Принудительное обновление
sudo certbot renew --dry-run
```

### Полный деплой (Senior Level)

```bash
#!/bin/bash
# scripts/full-deploy-senior.sh
# Senior-level deployment script with all best practices

set -euo pipefail  # Strict mode

SERVER="${1:?Server required (dev/prod)}"
BRANCH="${2:-main}"
APP_PATH="${3:-/var/www/app}"
APP_NAME="${4:-myapp}"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Production guard
if [[ "$SERVER" == "prod"* ]]; then
    log_warn "⚠️  PRODUCTION DEPLOYMENT ⚠️"
    read -p "Type 'deploy' to confirm: " confirm
    [[ "$confirm" != "deploy" ]] && { log_error "Aborted"; exit 1; }
fi

log_info "Starting deployment to $SERVER..."

# 1. Pre-deployment checks
log_info "Running pre-deployment checks..."
ssh $SERVER << EOF
    set -e
    cd $APP_PATH
    
    # Check disk space (>10% free)
    DISK_FREE=\$(df -h . | awk 'NR==2 {print \$5}' | tr -d '%')
    [ \$DISK_FREE -gt 90 ] && { echo "ERROR: Disk space low"; exit 1; }
    
    # Check memory (>20% free)
    MEM_FREE=\$(free | awk 'NR==2{printf "%.0f", \$7*100/\$2}')
    [ \$MEM_FREE -lt 20 ] && echo "WARNING: Memory low (\$MEM_FREE% free)"
    
    echo "Pre-checks passed"
EOF

# 2. Create backup
log_info "Creating backup..."
BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
ssh $SERVER << EOF
    cd $APP_PATH
    
    # Backup current release
    mkdir -p ../backups
    cp -r . ../backups/$BACKUP_NAME
    
    # Keep only last 5 backups
    ls -t ../backups | tail -n +6 | xargs -I {} rm -rf ../backups/{}
    
    echo "Backup created: $BACKUP_NAME"
EOF

# 3. Deploy code
log_info "Deploying code..."
ssh $SERVER << EOF
    set -e
    cd $APP_PATH
    
    # Log deployment
    logger -t DEPLOY "Deployment started by \$USER: branch=$BRANCH"
    
    # Fetch and checkout
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
    
    COMMIT=\$(git log -1 --format='%h %s')
    echo "Deployed: \$COMMIT"
EOF

# 4. Install dependencies and build
log_info "Installing dependencies..."
ssh $SERVER << EOF
    set -e
    cd $APP_PATH
    
    # Node.js app
    if [ -f "package.json" ]; then
        npm ci --production
        npm run build 2>/dev/null || true
    fi
    
    # Python app
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    fi
EOF

# 5. Run migrations (if any)
log_info "Running migrations..."
ssh $SERVER << EOF
    cd $APP_PATH
    
    # Prisma migrations
    if [ -f "prisma/schema.prisma" ]; then
        npx prisma migrate deploy
    fi
    
    # Django migrations
    if [ -f "manage.py" ]; then
        python manage.py migrate --noinput
    fi
EOF

# 6. Restart services
log_info "Restarting services..."
ssh $SERVER << EOF
    set -e
    
    # Docker Compose
    if [ -f "$APP_PATH/docker-compose.yml" ]; then
        cd $APP_PATH
        docker compose pull
        docker compose up -d --remove-orphans
        docker compose ps
    fi
    
    # Systemd service
    if systemctl is-enabled $APP_NAME 2>/dev/null; then
        sudo systemctl reload $APP_NAME || sudo systemctl restart $APP_NAME
        sleep 3
        sudo systemctl status $APP_NAME --no-pager
    fi
EOF

# 7. Health check
log_info "Running health checks..."
ssh $SERVER << EOF
    set -e
    
    # Wait for app to start
    sleep 5
    
    # Health endpoint
    for i in 1 2 3 4 5; do
        if curl -sf http://localhost:3000/health > /dev/null; then
            echo "Health check passed"
            break
        fi
        echo "Attempt \$i failed, retrying..."
        sleep 3
    done
    
    curl -sf http://localhost:3000/health || { echo "Health check failed!"; exit 1; }
EOF

# 8. Smoke tests
log_info "Running smoke tests..."
ssh $SERVER << EOF
    FAILED=0
    
    # Test endpoints
    curl -sf http://localhost:3000/ > /dev/null || { echo "Homepage FAIL"; ((FAILED++)); }
    curl -sf http://localhost:3000/api/status > /dev/null || { echo "API FAIL"; ((FAILED++)); }
    
    [ \$FAILED -gt 0 ] && { echo "Smoke tests failed: \$FAILED"; exit 1; }
    echo "All smoke tests passed"
EOF

# 9. Log completion
ssh $SERVER "logger -t DEPLOY 'Deployment completed successfully'"

log_info "✅ Deployment completed successfully!"
```

### Rollback скрипт (Senior Level)

```bash
#!/bin/bash
# scripts/rollback-senior.sh
set -euo pipefail

SERVER="${1:?Server required}"
BACKUP_NAME="${2:-}"  # Если не указан - последний бэкап
APP_PATH="${3:-/var/www/app}"

echo "=== Rollback on $SERVER ==="

# Production guard
if [[ "$SERVER" == "prod"* ]]; then
    echo "⚠️  PRODUCTION ROLLBACK ⚠️"
    read -p "Type 'rollback' to confirm: " confirm
    [[ "$confirm" != "rollback" ]] && { echo "Aborted"; exit 1; }
fi

ssh $SERVER << EOF
    set -e
    cd $APP_PATH/..
    
    # List backups
    echo "Available backups:"
    ls -lt backups/ | head -10
    
    # Select backup
    if [ -z "$BACKUP_NAME" ]; then
        BACKUP=\$(ls -t backups/ | head -1)
    else
        BACKUP="$BACKUP_NAME"
    fi
    
    echo "Rolling back to: \$BACKUP"
    
    # Verify backup exists
    [ ! -d "backups/\$BACKUP" ] && { echo "Backup not found"; exit 1; }
    
    # Log rollback
    logger -t DEPLOY "Rollback started: \$BACKUP"
    
    # Perform rollback
    rm -rf $APP_PATH.old 2>/dev/null || true
    mv $APP_PATH $APP_PATH.old
    cp -r backups/\$BACKUP $APP_PATH
    
    # Restart services
    cd $APP_PATH
    if [ -f "docker-compose.yml" ]; then
        docker compose up -d
    fi
    
    # Health check
    sleep 5
    curl -sf http://localhost:3000/health || { echo "Health check failed!"; exit 1; }
    
    logger -t DEPLOY "Rollback completed: \$BACKUP"
    echo "Rollback completed successfully"
EOF
```

### Мониторинг и диагностика (Lead Level)

```bash
#!/bin/bash
# scripts/diagnose-server.sh
# Lead-level server diagnostics

SERVER="${1:?Server required}"

echo "=== Server Diagnostics: $SERVER ==="

ssh $SERVER << 'EOF'
echo ""
echo "=== System Info ==="
echo "Hostname: $(hostname)"
echo "Ubuntu: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p)"

echo ""
echo "=== Resources ==="
echo "CPU:"
grep -c ^processor /proc/cpuinfo | xargs -I {} echo "  Cores: {}"
top -bn1 | grep "Cpu(s)" | awk '{print "  Usage: " $2 + $4 "%"}'

echo "Memory:"
free -h | awk 'NR==2{printf "  Total: %s, Used: %s, Free: %s\n", $2, $3, $4}'

echo "Disk:"
df -h / | awk 'NR==2{printf "  Total: %s, Used: %s (%s), Free: %s\n", $2, $3, $5, $4}'

echo ""
echo "=== Docker ==="
if command -v docker &> /dev/null; then
    docker --version
    echo "Containers:"
    docker ps --format "  {{.Names}}: {{.Status}}" 2>/dev/null || echo "  No access"
    echo "Resources:"
    docker system df 2>/dev/null | head -5 || echo "  No access"
else
    echo "Docker not installed"
fi

echo ""
echo "=== Services ==="
for svc in nginx postgresql redis docker; do
    if systemctl is-active $svc &>/dev/null; then
        echo "  $svc: ✅ active"
    elif systemctl is-enabled $svc &>/dev/null; then
        echo "  $svc: ⚠️ enabled but not running"
    fi
done

echo ""
echo "=== Network ==="
echo "Listening ports:"
ss -tuln | grep LISTEN | awk '{print "  " $5}' | sort -u

echo ""
echo "=== Recent Errors ==="
echo "Syslog (last 5 errors):"
grep -i error /var/log/syslog 2>/dev/null | tail -5 | sed 's/^/  /' || echo "  No access"

echo ""
echo "=== Processes (top 5 by memory) ==="
ps aux --sort=-%mem | head -6 | awk 'NR>1{printf "  %s: %.1f%% mem, %.1f%% cpu\n", $11, $4, $3}'

EOF

echo ""
echo "=== Diagnostics complete ==="
```

### Автоматический healthcheck cron

```bash
# /etc/cron.d/app-healthcheck
# Health check every minute, alert on failure

* * * * * deploy /usr/local/bin/healthcheck.sh >> /var/log/healthcheck.log 2>&1
```

```bash
#!/bin/bash
# /usr/local/bin/healthcheck.sh

APP_URL="${APP_URL:-http://localhost:3000}"
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"

check_health() {
    curl -sf "$APP_URL/health" -o /dev/null -w "%{http_code}"
}

STATUS=$(check_health)

if [ "$STATUS" != "200" ]; then
    MSG="🚨 Health check failed: $APP_URL (status: $STATUS)"
    echo "[$(date)] $MSG"
    
    # Send alert to Slack
    if [ -n "$SLACK_WEBHOOK" ]; then
        curl -sf -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$MSG\"}" \
            "$SLACK_WEBHOOK"
    fi
    
    # Try to restart
    if [ -f /var/www/app/docker-compose.yml ]; then
        cd /var/www/app && docker compose restart
    fi
fi
```

---
*Навык создан: DevOps Agent | Версия: 2.0 (Senior/Lead Level) | Ubuntu 24.04 LTS*
