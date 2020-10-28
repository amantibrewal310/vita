from rest_framework import routers
from django.urls import path, include
from .views import MembershipView, UserMembershipView, SubscriptionView

app_name = 'membership'
router = routers.DefaultRouter()
router.register(r'type', MembershipView)
router.register(r'user-membership', UserMembershipView)
router.register(r'subscriptions', SubscriptionView)

urlpatterns = [
    path('', include(router.urls)),
]
