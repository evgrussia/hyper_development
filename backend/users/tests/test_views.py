"""
Tests for auth API views (Phase 1).
"""
from unittest.mock import patch

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient



class TelegramAuthViewTests(TestCase):
    """POST /api/auth/telegram/"""

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/auth/telegram/"

    def test_post_missing_required_fields(self):
        res = self.client.post(self.url, {}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_missing_hash(self):
        res = self.client.post(
            self.url,
            {"id": 123, "auth_date": "1700000000"},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("users.views.verify_telegram_widget_hash")
    def test_post_invalid_hash_returns_403(self, mock_verify):
        mock_verify.return_value = False
        res = self.client.post(
            self.url,
            {"id": 123, "first_name": "A", "auth_date": "1700000000", "hash": "x"},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class TelegramWebAppAuthViewTests(TestCase):
    """POST /api/auth/telegram/webapp/"""

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/auth/telegram/webapp/"

    def test_post_missing_init_data(self):
        res = self.client.post(self.url, {}, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("users.views.verify_telegram_webapp_init_data")
    def test_post_invalid_init_data_returns_403(self, mock_verify):
        mock_verify.return_value = False
        res = self.client.post(
            self.url,
            {"init_data": "invalid"},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
