from rest_framework import routers
from django.urls import path, include

from . import views


router = routers.DefaultRouter()
router.register(r'', views.VideoViewSet)
# router.register(r'comment/', views.CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('comment/', views.CommentViewSet)
]
