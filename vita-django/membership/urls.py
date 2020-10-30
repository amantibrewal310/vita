from rest_framework import routers
from django.urls import path, include
from .views import MembershipView, UserMembershipView, SubscriptionView, GetUserMembershipTypeView, CreateSubscriptionView

app_name = 'membership'
router = routers.DefaultRouter()
router.register(r'type', MembershipView)
router.register(r'user-membership', UserMembershipView)
router.register(r'subscriptions', SubscriptionView)

urlpatterns = [
    path('', include(router.urls)),
    path('user/type/', GetUserMembershipTypeView,
         name="get-user-membership-type"),
    path('create-subscription/', CreateSubscriptionView, name="create-subscription")
]
