from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import NewUser
from .serializers import CustomUserSerializer

from django.http import JsonResponse
from django.contrib.auth import get_user_model


class UserViewSet(viewsets.ModelViewSet):

    permission_classes_by_action = {'create': [AllowAny]}
    queryset = NewUser.objects.all().order_by('id')
    serializer_class = CustomUserSerializer

    # Can't change ther function name
    def get_permission(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


@api_view(['GET'])
def userDetail(request, email):
    try:
        loggedInUser = NewUser.objects.get(email=email)
    except NewUser.DoesNotExist:
        return JsonResponse({'detail' : 'user does not exist'})

    serializer = CustomUserSerializer(loggedInUser, many=False);
    return Response(serializer.data, status=status.HTTP_200_OK)