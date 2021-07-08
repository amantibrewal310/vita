from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet
from .views import  userDetail, sendEmail
from .views import (PasswordTokenCheckAPI, RequestPasswordResetEmail, 
                    SetNewPasswordAPIView)

app_name = 'users'
router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('byemail/<str:email>/', userDetail, name='test'),

    path('sendmail/now/', sendEmail, name='sendmail'),

    # send mail
    path('password-reset/send-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    # verify user and token
    path('password-reset/verify-token/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), 
        name='password-reset-confirm'),
    # set new password
    path('password-reset/set-password/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]
