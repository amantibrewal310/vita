from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from .models import NewUser


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



class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

