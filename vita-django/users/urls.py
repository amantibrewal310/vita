from rest_framework import routers
from django.urls import path, include
from .views import CustomUserCreate, UserViewSet

app_name = 'users'
router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('', include(router.urls))
]
