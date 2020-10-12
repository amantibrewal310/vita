from rest_framework import routers
from django.urls import path, include

from . import views


router = routers.DefaultRouter()
router.register(r'list', views.VideoViewSet)
router.register(r'comment', views.CommentViewSet)

urlpatterns = [
    path('comment/<str:pk>/', views.comment),
    path('', include(router.urls)),
]
