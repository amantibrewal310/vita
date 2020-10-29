from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from membership.models import UserMembership
from .configure import gateway

# Create your views here.


def validate_user_session(id):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user != None:
            return True
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
@api_view(['GET'])
def generate_token(request):
    id = request.user.id
    if not validate_user_session(id):
        return JsonResponse({'error': 'Invalid Session, Please login again!'})

    # customerID = UserMembership.objects.get(user=request.user)
    customerID = UserMembership.objects.get(
        user=request.user).braintree_customer_id
    # client_token = gateway.client_token.generate()
    client_token = gateway.client_token.generate({
        "customer_id": customerID
    })
    return JsonResponse({'clientToken': client_token, 'success': True})


@csrf_exempt
@api_view(["POST"])
def process_payment(request):
    id = request.user.id
    if not validate_user_session(id):
        return JsonResponse({'error': 'Invalid session, Please login agian!'})

    # customerID = UserMembership.objects.get(user=request.user)
    customerID = UserMembership.objects.get(
        user=request.user).braintree_customer_id

    nonce_from_the_client = request.POST["paymentMethodNonce"]
    # planID = request.POST["planID"]
    # amount_from_the_client = request.POST["amount"]

    paymentResult = gateway.payment_method.create({
        "customer_id": customerID,
        "payment_method_nonce": nonce_from_the_client
    })

    if paymentResult.is_success:
        print(paymentResult)
        paymentMethodToken = paymentResult.payment_method.token

        return JsonResponse({
            "success": paymentResult.is_success,
            "paymentMethodToken": paymentMethodToken
        })

    return JsonResponse({
        "error": True,
        "success": False
    })

    #  Create Subscription

    # subscriptionResult = gateway.subscription.create({
    #     "payment_method_token": paymentMethodToken,
    #     "plan_id": planID,
    # })

    # if subscriptionResult.is_success:
    #     qs = Subscription.objects.get(user_membership=request.user)
    #     print(qs)
    #     pass
    # result = gateway.subscription.create({
    #     "payment_method_nonce": nonce_from_the_client,
    #     "plan_id": "cn3b",
    # })
    # if result.is_success:
    #     print(result)

    # if result.is_success:
    #     return JsonResponse({
    #         "success": result.is_success,
    #         "transaction": {
    #             'id': result.transaction.id,
    #             'amount': result.transaction.amount
    #         }
    #     })
    # else:
    # return JsonResponse({'error': True, 'success': False})
