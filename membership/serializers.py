from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Membership, UserMembership, Subscription


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"


class UserMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMembership
        fields = "__all__"


class SubscriptionSerializer(serializers.ModelSerializer):
    user_membership = serializers.ReadOnlyField(source='user_membership.id')

    class Meta:
        model = Subscription
        fields = ('braintree_subscription_id', "active", "user_membership")
