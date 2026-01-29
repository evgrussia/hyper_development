from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from .views import api_root

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include([
        path("", api_root),
        path("auth/jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
        path("", include("users.urls")),
    ])),
]
