from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Membership, UserMembership, Subscription
from .serializers import MembershipSerializer, UserMembershipSerializer, SubscriptionSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from payment.configure import gateway

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


@api_view(["GET"])
def GetUserMembershipTypeView(request):
    queryset = UserMembership.objects.get(user=request.user)

    return Response(data={
        "membership_type": str(queryset.membership)
    }, status=status.HTTP_200_OK)


@api_view(["POST"])
def CreateSubscriptionView(request):

    if request.user.id == None:
        return JsonResponse({
            "error": True,
            "success": False,
            "msg": "Invalid User, Try to login please!"
        })

    planID = request.POST["planID"]
    paymentMethodToken = request.POST["paymentMethodToken"]

    result = gateway.subscription.create({
        "payment_method_token": paymentMethodToken,
        "plan_id": planID,
    })

    if result.is_success:
        subscriptonID = result.subscription.id
        userMembership = UserMembership.objects.get(user=request.user)

        try:
            qs = Subscription.objects.get(user_membership__user=request.user)

            serializer = SubscriptionSerializer(qs, data={
                "braintree_subcription_id": subscriptonID
            }, partial=True)

            if serializer.is_valid():
                print("isValid")
                serializer.save(user_membership=userMembership)

                membershipID = Membership.objects.get(
                    braintree_plan_id=planID).id

                userMembershipSerializer = UserMembershipSerializer(userMembership, data={
                    "membership": membershipID
                }, partial=True)

                if userMembershipSerializer.is_valid():
                    userMembershipSerializer.save()
                    return JsonResponse({
                        "success": True,
                        "error": False,
                        "msg": "You have subcribed the plan"
                    })
            return JsonResponse({
                "success": False,
                "Error": True,
                "msg": "Something went wrong"
            })

        except Subscription.DoesNotExist:
            serializer = SubscriptionSerializer(data={
                "braintree_subscription_id": subscriptonID,
                "active": True
            })
            print(serializer)

            if serializer.is_valid():
                print("isValid")
                serializer.save(user_membership=userMembership)

                membershipID = Membership.objects.get(
                    braintree_plan_id=planID).id

                userMembershipSerializer = UserMembershipSerializer(userMembership, data={
                    "membership": membershipID
                }, partial=True)

                if userMembershipSerializer.is_valid():
                    userMembershipSerializer.save()
                    return JsonResponse({
                        "success": True,
                        "error": False,
                        "msg": "You have subcribed the plan"
                    })

            return JsonResponse({
                "success": False,
                "Error": True,
                "msg": "Something went wrong"
            })
