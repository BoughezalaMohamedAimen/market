from rest_framework import serializers
from accounts.models import UserProfile
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    name=serializers.ReadOnlyField(source='user_name')
    email=serializers.ReadOnlyField(source='user_email')
    region=serializers.ReadOnlyField(source='user_region')
    username=serializers.ReadOnlyField(source='user_username')

    class Meta:
        model = UserProfile
        exclude=['activate','user']


class EditProfileSerializer(serializers.ModelSerializer):
    username=serializers.ReadOnlyField(source='user_username')
    first_name=serializers.ReadOnlyField(source='user_first_name')
    last_name=serializers.ReadOnlyField(source='user_last_name')
    email=serializers.ReadOnlyField(source='user_email')
    wilaya=serializers.ReadOnlyField(source='user_wilaya')
    class Meta:
        model = UserProfile
        exclude=['activate','user','id','rolee']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['first_name','last_name']
