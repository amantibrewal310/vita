from django.urls import path, include
from . import views


urlpatterns = [
    path('gettoken/',
         views.generate_token, name="token.generate"),
    path('process/',
         views.process_payment, name="payment.process"),
]
