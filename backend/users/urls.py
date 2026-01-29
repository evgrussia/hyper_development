from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("auth/telegram/", views.TelegramAuthView.as_view(), name="auth-telegram"),
    path("auth/telegram/webapp/", views.TelegramWebAppAuthView.as_view(), name="auth-telegram-webapp"),
]
