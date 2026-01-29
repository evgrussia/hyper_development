from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, TelegramProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "telegram_id", "email", "role", "is_staff")
    list_filter = ("role", "is_staff")
    search_fields = ("username", "email", "telegram_id")
    ordering = ("-date_joined",)


@admin.register(TelegramProfile)
class TelegramProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "telegram_id", "username", "updated_at")
    search_fields = ("telegram_id", "username")
