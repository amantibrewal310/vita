from rest_framework import serializers
from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        # adding is_staff for admin verification
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