from django.contrib import admin
from django.urls import path, include
# from rest_framework.schemas import get_schema_view
# from rest_framework.documentation import include_docs_urls
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Oauth
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
   
    # admin
    path('admin/', admin.site.urls),

    # API
    path('api/', include('vita_api.urls'), name='vita_api'),

    # User 
    path('api/user/', include('users.urls'), name='users'),

    # facility to directly login from DRF GUI
    path('api-auth/', include('rest_framework.urls'), name='rest_framework'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
