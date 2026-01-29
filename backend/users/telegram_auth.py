"""
Telegram auth verification: Login Widget and WebApp initData.
Phase 1 — HMAC-SHA256 per Telegram docs.
"""
import hashlib
import hmac
from urllib.parse import parse_qsl
from django.conf import settings


def _sha256(data: bytes) -> bytes:
    return hashlib.sha256(data).digest()


def verify_telegram_widget_hash(payload: dict, received_hash: str) -> bool:
    """
    Verify hash from Telegram Login Widget.
    data_check_string = key=value for each field except hash, sorted by key, joined by \\n.
    secret_key = SHA256(bot_token)
    hash = HMAC-SHA256(data_check_string, secret_key) in hex.
    """
    token = (settings.TELEGRAM_BOT_TOKEN or "").strip()
    if not token:
        return False
    if not received_hash:
        return False
    # Build data-check-string: alphabetical key=value, newline-separated
    parts = []
    for k in sorted(payload.keys()):
        if k == "hash":
            continue
        v = payload[k]
        if v is None:
            v = ""
        parts.append(f"{k}={v}")
    data_check_string = "\n".join(parts)
    secret_key = _sha256(token.encode("utf-8"))
    expected = hmac.new(
        secret_key,
        data_check_string.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, received_hash)


def verify_telegram_webapp_init_data(init_data_raw: str) -> bool:
    """
    Verify initData from Telegram WebApp (window.Telegram.WebApp.initData).
    secret_key = HMAC-SHA256("WebAppData", bot_token)
    data_check_string = key=value (except hash), sorted, joined by \\n
    hash = HMAC-SHA256(data_check_string, secret_key) in hex.
    Also check auth_date is not too old (TELEGRAM_WEBAPP_AUTH_MAX_AGE_SECONDS).
    """
    token = (settings.TELEGRAM_BOT_TOKEN or "").strip()
    if not token or not init_data_raw:
        return False
    try:
        pairs = parse_qsl(init_data_raw, keep_blank_values=True)
    except Exception:
        return False
    payload = dict(pairs)
    received_hash = payload.get("hash")
    if not received_hash:
        return False
    auth_date_str = payload.get("auth_date")
    if not auth_date_str:
        return False
    try:
        auth_date = int(auth_date_str)
    except ValueError:
        return False
    import time
    max_age = getattr(settings, "TELEGRAM_WEBAPP_AUTH_MAX_AGE_SECONDS", 86400)
    if time.time() - auth_date > max_age:
        return False
    parts = []
    for k in sorted(payload.keys()):
        if k == "hash":
            continue
        v = payload[k]
        if v is None:
            v = ""
        parts.append(f"{k}={v}")
    data_check_string = "\n".join(parts)
    secret_key = hmac.new(
        "WebAppData".encode("utf-8"),
        token.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    expected = hmac.new(
        secret_key,
        data_check_string.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, received_hash)


def parse_webapp_user(init_data_raw: str) -> dict | None:
    """Parse user from initData (after verification). Returns user dict or None."""
    try:
        pairs = parse_qsl(init_data_raw, keep_blank_values=True)
    except Exception:
        return None
    payload = dict(pairs)
    user_str = payload.get("user")
    if not user_str:
        return None
    import json
    try:
        user = json.loads(user_str)
    except json.JSONDecodeError:
        return None
    return user
