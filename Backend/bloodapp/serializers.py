from rest_framework import serializers
from .models import UserInfoModel,ChatMessage
from django.contrib.auth.models import User

# class DonateReceiveSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=DonorReceiverModel
#         fields='__all__'

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name',
            'password',
            'last_name',
            'username',
            'email'
        ]
        extra_kwargs = {
            'password':{'write_only':True}
        }

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfoModel
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'