from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from users.models import NewUser

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str
from django.utils.http import urlsafe_base64_decode


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('id', 'email', 'username', 'password', 'about', 'first_name', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# serializer for request pass change by email
class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    class Meta:
        fields = ['email']

# serializer for setting new password 
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = NewUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
            return (user)

        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        
        return super().validate(attrs)


