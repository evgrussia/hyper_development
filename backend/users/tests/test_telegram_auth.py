"""
Tests for Telegram auth verification (Phase 1).
"""
import hashlib
import hmac
from unittest.mock import patch

from django.test import TestCase

from users.telegram_auth import verify_telegram_widget_hash, verify_telegram_webapp_init_data


class TelegramWidgetHashTests(TestCase):
    """Verify Telegram Login Widget hash verification."""

    @patch("users.telegram_auth.settings")
    def test_verify_widget_hash_empty_token(self, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = ""
        self.assertFalse(verify_telegram_widget_hash({"id": "123", "auth_date": "1"}, "abc"))

    @patch("users.telegram_auth.settings")
    def test_verify_widget_hash_empty_hash(self, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = "123:ABC"
        self.assertFalse(verify_telegram_widget_hash({"id": "123", "auth_date": "1"}, ""))

    @patch("users.telegram_auth.settings")
    def test_verify_widget_hash_valid(self, mock_settings):
        token = "123456:ABC-DEF"
        mock_settings.TELEGRAM_BOT_TOKEN = token
        payload = {"auth_date": "1700000000", "first_name": "Test", "id": "12345", "username": "user"}
        data_check = "\n".join(f"{k}={v}" for k, v in sorted(payload.items()))
        secret = hashlib.sha256(token.encode()).digest()
        expected_hash = hmac.new(secret, data_check.encode(), hashlib.sha256).hexdigest()
        self.assertTrue(verify_telegram_widget_hash(payload, expected_hash))

    @patch("users.telegram_auth.settings")
    def test_verify_widget_hash_invalid(self, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = "123:ABC"
        payload = {"id": "123", "auth_date": "1"}
        self.assertFalse(verify_telegram_widget_hash(payload, "wrong_hash"))


class TelegramWebAppInitDataTests(TestCase):
    """Verify WebApp initData verification."""

    @patch("users.telegram_auth.settings")
    def test_verify_webapp_empty_token(self, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = ""
        self.assertFalse(verify_telegram_webapp_init_data("query=value"))

    @patch("users.telegram_auth.settings")
    def test_verify_webapp_empty_data(self, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = "123:ABC"
        self.assertFalse(verify_telegram_webapp_init_data(""))

    @patch("users.telegram_auth.settings")
    @patch("time.time")
    def test_verify_webapp_expired_auth_date(self, mock_time, mock_settings):
        mock_settings.TELEGRAM_BOT_TOKEN = "123:ABC"
        mock_settings.TELEGRAM_WEBAPP_AUTH_MAX_AGE_SECONDS = 3600
        mock_time.return_value = 100000
        # auth_date=90000 is 10000 sec before "now" (100000) -> expired if max_age=3600
        init_data = "auth_date=90000&hash=abc"
        self.assertFalse(verify_telegram_webapp_init_data(init_data))
