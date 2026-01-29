"""
Auth services: get or create user from Telegram data, issue JWT.
"""
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, TelegramProfile
from .telegram_auth import parse_webapp_user


def get_or_create_user_from_telegram_widget(payload: dict):
    """
    After hash verification: get or create User and TelegramProfile from widget payload.
    payload: id, first_name, last_name, username, photo_url, auth_date (hash already verified).
    Returns (user, created).
    """
    telegram_id = int(payload["id"])
    username = (payload.get("username") or "").strip() or None
    first_name = (payload.get("first_name") or "").strip() or ""
    last_name = (payload.get("last_name") or "").strip() or ""
    photo_url = (payload.get("photo_url") or "").strip() or ""

    user = User.objects.filter(telegram_id=telegram_id).first()
    created = False
    if not user:
        user = User(
            username=f"tg_{telegram_id}",
            telegram_id=telegram_id,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_unusable_password()
        user.save()
        created = True
    else:
        user.first_name = first_name or user.first_name
        user.last_name = last_name or user.last_name
        user.save(update_fields=["first_name", "last_name"])

    profile, _ = TelegramProfile.objects.update_or_create(
        user=user,
        defaults={
            "telegram_id": telegram_id,
            "username": username or "",
            "first_name": first_name,
            "last_name": last_name,
            "photo_url": photo_url,
        },
    )
    return user, created


def get_or_create_user_from_webapp_user(user_data: dict):
    """
    user_data from parse_webapp_user(init_data): id, first_name, last_name, username, etc.
    """
    telegram_id = int(user_data["id"])
    username = (user_data.get("username") or "").strip() or None
    first_name = (user_data.get("first_name") or "").strip() or ""
    last_name = (user_data.get("last_name") or "").strip() or ""
    photo_url = ""
    if user_data.get("photo_url"):
        photo_url = user_data.get("photo_url", "").strip()

    user = User.objects.filter(telegram_id=telegram_id).first()
    created = False
    if not user:
        user = User(
            username=f"tg_{telegram_id}",
            telegram_id=telegram_id,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_unusable_password()
        user.save()
        created = True
    else:
        user.first_name = first_name or user.first_name
        user.last_name = last_name or user.last_name
        user.save(update_fields=["first_name", "last_name"])

    TelegramProfile.objects.update_or_create(
        user=user,
        defaults={
            "telegram_id": telegram_id,
            "username": username or "",
            "first_name": first_name,
            "last_name": last_name,
            "photo_url": photo_url,
        },
    )
    return user, created


def get_tokens_for_user(user):
    """Return { access, refresh } for JWT."""
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}
