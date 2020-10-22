
from django.urls import path, include
from . import views

urlpatterns = [
    path('video/', include('video.urls'), name='video'),
    path('videos/', views.GetVideosByCategory, name="videos-by-category"),
]
