#!/bin/bash
# Завершение деплоя: Nginx + SSL для hyper-development.ru
# Запуск на VPS (один раз): sudo bash /home/deploy/hyper_development/deploy/complete-nginx-and-ssl.sh

set -e

CONF_SOURCE="/home/deploy/hyper_development/deploy/nginx-hyper-development.ru.conf"
CONF_DEST="/etc/nginx/sites-available/hyper-development.ru"
SITES_ENABLED="/etc/nginx/sites-enabled/hyper-development.ru"

echo ">>> Копирование конфига Nginx..."
cp "$CONF_SOURCE" "$CONF_DEST"

echo ">>> Включение сайта..."
ln -sf "$CONF_DEST" "$SITES_ENABLED"

echo ">>> Проверка конфигурации Nginx..."
nginx -t

echo ">>> Перезагрузка Nginx..."
systemctl reload nginx

echo ">>> Запрос SSL-сертификата (Let's Encrypt)..."
# Опционально: export CERTBOT_EMAIL=your@email.com перед запуском
if [ -n "$CERTBOT_EMAIL" ]; then
  certbot --nginx -d hyper-development.ru -d www.hyper-development.ru --non-interactive --agree-tos -m "$CERTBOT_EMAIL"
else
  certbot --nginx -d hyper-development.ru -d www.hyper-development.ru --non-interactive --agree-tos --register-unsafely-without-email || true
fi

echo ">>> Финальная перезагрузка Nginx..."
systemctl reload nginx

echo ">>> Готово. Проверка: curl -sI https://hyper-development.ru/"
curl -sI https://hyper-development.ru/ | head -5
