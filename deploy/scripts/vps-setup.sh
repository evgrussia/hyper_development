#!/bin/bash
# Первичная настройка VPS для деплоя (Ubuntu 24.04)
# Запуск: sudo bash vps-setup.sh
# Перед запуском: установить Docker, создать пользователя deploy, положить SSH-ключ.

set -e

PROJECT_PATH="${1:-/var/www/hyper_development}"
REPO_URL="${2:-https://github.com/evgrussia/hyper_development.git}"
BRANCH="${3:-main}"

echo ">>> Project path: $PROJECT_PATH"
echo ">>> Repo: $REPO_URL"

apt-get update -qq && apt-get install -y -qq git curl nginx certbot python3-certbot-nginx ufw

# Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable || true

# Project dir
mkdir -p "$(dirname "$PROJECT_PATH")"
if [ ! -d "$PROJECT_PATH" ]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$PROJECT_PATH"
fi

# Nginx configs из deploy/nginx/ (репо в PROJECT_PATH)
NGINX_SRC="$PROJECT_PATH/deploy/nginx"
if [ -d "$NGINX_SRC" ]; then
  for f in "$NGINX_SRC/"*.conf; do
    [ -f "$f" ] || continue
    name=$(basename "$f")
    cp "$f" /etc/nginx/sites-available/
    ln -sf "/etc/nginx/sites-available/$name" /etc/nginx/sites-enabled/"$name" 2>/dev/null || true
  done
  nginx -t && systemctl reload nginx
else
  echo ">>> Skip nginx: $NGINX_SRC not found (clone repo first)."
fi

echo ">>> Done. Next: create $PROJECT_PATH/.env from deploy/.env.production.example, run certbot, then deploy."
