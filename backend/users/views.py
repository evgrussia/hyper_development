"""
Auth API: Telegram Widget and WebApp (Phase 1).
"""
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .telegram_auth import (
    verify_telegram_widget_hash,
    verify_telegram_webapp_init_data,
    parse_webapp_user,
)
from .services import (
    get_or_create_user_from_telegram_widget,
    get_or_create_user_from_webapp_user,
    get_tokens_for_user,
)


@permission_classes([AllowAny])
class TelegramAuthView(APIView):
    """
    POST /api/auth/telegram/
    Body: id, first_name, last_name, username?, photo_url?, auth_date, hash
    Verifies hash → create/update user → return JWT (access + refresh).
    """

    def post(self, request: Request) -> Response:
        data = request.data
        if isinstance(data, list):
            return Response({"detail": "Invalid payload"}, status=status.HTTP_400_BAD_REQUEST)
        required = {"id", "auth_date", "hash"}
        if not required.issubset(data.keys()):
            return Response(
                {"detail": "Missing id, auth_date or hash"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Build payload for hash verification: all fields except hash, values as strings (Telegram order)
        try:
            payload = {k: str(v) if v is not None else "" for k, v in data.items() if k != "hash"}
        except (TypeError, ValueError):
            return Response({"detail": "Invalid field types"}, status=status.HTTP_400_BAD_REQUEST)

        if not verify_telegram_widget_hash(payload, str(data["hash"])):
            return Response({"detail": "Invalid hash"}, status=status.HTTP_403_FORBIDDEN)

        # Payload for user creation (id as int)
        user_payload = {
            "id": int(data["id"]),
            "first_name": (data.get("first_name") or ""),
            "last_name": (data.get("last_name") or ""),
            "username": (data.get("username") or ""),
            "photo_url": (data.get("photo_url") or ""),
            "auth_date": data.get("auth_date"),
        }
        user, _ = get_or_create_user_from_telegram_widget(user_payload)
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_200_OK)


@permission_classes([AllowAny])
class TelegramWebAppAuthView(APIView):
    """
    POST /api/auth/telegram/webapp/
    Body: { "init_data": "<raw initData string>" }
    Verifies initData → user by telegram_id → JWT.
    """

    def post(self, request: Request) -> Response:
        init_data = request.data.get("init_data") or request.data.get("init_data_raw")
        if not init_data or not isinstance(init_data, str):
            return Response(
                {"detail": "init_data required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not verify_telegram_webapp_init_data(init_data):
            return Response(
                {"detail": "Invalid or expired initData"},
                status=status.HTTP_403_FORBIDDEN,
            )
        user_data = parse_webapp_user(init_data)
        if not user_data:
            return Response(
                {"detail": "User data not found in initData"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user, _ = get_or_create_user_from_webapp_user(user_data)
        tokens = get_tokens_for_user(user)
        return Response(tokens, status=status.HTTP_200_OK)
