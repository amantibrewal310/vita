
from django.urls import path, include

urlpatterns = [
    path('video/', include('video.urls'), name='video'),
]
