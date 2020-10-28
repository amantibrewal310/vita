from django.shortcuts import render
from rest_framework import viewsets
from .models import Membership, UserMembership, Subscription
from .serializers import MembershipSerializer, UserMembershipSerializer, SubscriptionSerializer
# Create your views here.


class MembershipView(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


class UserMembershipView(viewsets.ModelViewSet):
    queryset = UserMembership.objects.all()
    serializer_class = UserMembershipSerializer


class SubscriptionView(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
