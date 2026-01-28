#!/bin/bash
# Удаление битого симлинка hyper-development.ru (с \r в имени)
# Запуск: sudo bash /home/deploy/hyper_development/deploy/fix-nginx-broken-symlink.sh

set -e

SITES_ENABLED="/etc/nginx/sites-enabled"
CONF_DEST="/etc/nginx/sites-available/hyper-development.ru"

echo ">>> Удаление битых симлинков (target не существует)..."
for f in "$SITES_ENABLED"/hyper-development.ru*; do
  [ -L "$f" ] || continue
  target=$(readlink -f "$f" 2>/dev/null || true)
  if [ -z "$target" ] || [ ! -f "$target" ]; then
    echo "  Удаляю: $f"
    rm -f "$f"
  fi
done

echo ">>> Восстановление конфига и симлинка при необходимости..."
if [ ! -f "$CONF_DEST" ]; then
  cp /home/deploy/hyper_development/deploy/nginx-hyper-development.ru.conf "$CONF_DEST"
  sed -i 's/\r$//' "$CONF_DEST"
fi
if [ ! -L "$SITES_ENABLED/hyper-development.ru" ] || [ ! -f "$(readlink -f "$SITES_ENABLED/hyper-development.ru" 2>/dev/null)" ]; then
  ln -sf "$CONF_DEST" "$SITES_ENABLED/hyper-development.ru"
fi

echo ">>> Проверка Nginx..."
nginx -t

echo ">>> Готово. Запустите: sudo bash /home/deploy/hyper_development/deploy/complete-nginx-and-ssl.sh"
