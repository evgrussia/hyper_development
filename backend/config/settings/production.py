"""
Django production settings — Universal Backend MVP.
Используется при деплое (DJANGO_SETTINGS_MODULE=config.settings.production).
"""
from .base import *  # noqa: F401, F403

DEBUG = False
# SECRET_KEY, ALLOWED_HOSTS, CORS, DB, TELEGRAM_* — из env (.env на VPS)
