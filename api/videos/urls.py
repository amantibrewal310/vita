from rest_framework import routers
from django.urls import path, include

from . import views


router = routers.DefaultRouter()
router.register(r'video-list', views.VideoViewSet)
router.register(r'comment-list', views.CommentViewSet)

urlpatterns = [
    # Not needed probably
    # path('comment/<str:pk>/', views.comment),
    path('', include(router.urls)),
]
