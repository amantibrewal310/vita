from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet, userDetail

app_name = 'users'
router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('byemail/<str:email>/', userDetail, name='test')
]
