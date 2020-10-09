from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import re
import random

# Create your views here.

def generateSessionToken(length=10):
    
    charList = [chr(i) for i in range(97,123)]
    numList = [str(i) for i in range(10)]

    token = ''.join(random.SystemRandom().choice(charList + numList) for _ in range(length))

    return token

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({
            'error': 'Send a POST request with valid parameter only'
        })
    
    username = request.POST['email']
    password = request.POST['password']

    # Validation Part

    emailRegexPattern = "^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$"

    if not re.match(emailRegexPattern, username):
        return JsonResponse({
            'error': 'Enter a valid email'
        })
    
    if len(password) < 3:
        return JsonResponse({
            'error': 'Password needs to be atleast 3 characters long'
        })
    
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usrDict = UserModel.objects.filter(email=username).values().first()

            usrDict.pop("password")

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({
                    "error": "Previous Session Exists!"
                })
            
            token = generateSessionToken()
            user.session_token = token
            user.save()

            login(request, user) # Django Default Login
            return JsonResponse({
                'token': token,
                'user': usrDict
            })
        else :
            return JsonResponse({
                'error': "Invalid Password"
            })

    except UserModel.DoesNotExist:
        return JsonResponse({
            'error': 'User NOT FOUND!'
        })

def signout(request, id):

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
        logout(request)

    except UserModel.DoesNotExist:
        return JsonResponse({
            'error': "Invalid User"
        })
    return JsonResponse({
        'success': 'Logout Success'
    })


class UserViewSet(viewsets.ModelViewSet):

    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    # Can't change ther function name
    def get_permission(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
