"""
User and Telegram profile models (Phase 1).
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """User with optional Telegram binding."""
    email = models.EmailField(blank=True, null=True)
    telegram_id = models.BigIntegerField(unique=True, null=True, blank=True, db_index=True)
    role = models.CharField(
        max_length=20,
        choices=[("user", "User"), ("partner", "Partner"), ("admin", "Admin")],
        default="user",
    )

    class Meta:
        db_table = "users_user"


class TelegramProfile(models.Model):
    """Telegram profile data (widget/webapp). OneToOne with User."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="telegram_profile")
    telegram_id = models.BigIntegerField(unique=True, db_index=True)
    username = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    photo_url = models.URLField(max_length=512, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "users_telegram_profile"
