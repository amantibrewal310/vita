
from django.urls import path, include
from . import views

urlpatterns = [
    path('video/', include('video.urls'), name='video'),
    path('videos/', views.GetVideosByCategory, name="videos-by-category"),
    path('membership/', include('membership.urls'), name="membership"),
    path('payment/', include('payment.urls'), name="payment"),

]
