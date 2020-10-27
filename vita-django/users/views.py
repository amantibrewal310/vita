
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import NewUser

from .serializers import CustomUserSerializer
from .serializers import ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer

from django.http import JsonResponse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str ,force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from .utils import Util

# **************************************************************************


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


# send email

@api_view(['GET'])
def sendEmail(request):
    email_body = 'Hi Harshit'
    to_email = 'harshit02gangwar@gmail.com'
    email_subject = 'Testing the email'
    data = {'email_body': email_body, 'to_email': to_email, 'email_subject': email_subject}
    Util.send_email(data)
    
    return JsonResponse({'status': 'success'})


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')
        
        if not email:
            return Response({'error': 'email required in body'})

        if NewUser.objects.filter(email=email).exists():
            user = NewUser.objects.get(email=email)
            
            # encode user id into base 64
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
    
            email_body = 'Hello ' + user.username + '\nUse token to reset your password\n' + uidb64 + '/' + token + '/'

            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            
            Util.send_email(data)
            
        return Response({'success': 'Please, check you mail for token'}, status=status.HTTP_200_OK)


# check the user with the token recieved
class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        # decode id from 
        id = smart_str(urlsafe_base64_decode(uidb64))
        user = NewUser.objects.get(id=id)

        try:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Credentials valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error': 'Token is not valid, request a new one'}, status=status.HTTP_401_UNAUTHORIZED)


# set new password when token-user validation is done
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

