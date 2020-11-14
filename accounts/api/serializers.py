from rest_framework import serializers
from accounts.models import UserProfile,AnonymousSession
from django.contrib.auth.models import User
import re



class EditProfileSerializer(serializers.ModelSerializer):
    username=serializers.ReadOnlyField(source='user_username')
    first_name=serializers.ReadOnlyField(source='user_first_name')
    last_name=serializers.ReadOnlyField(source='user_last_name')
    email=serializers.ReadOnlyField(source='user_email')
    wilaya=serializers.ReadOnlyField(source='user_wilaya')
    class Meta:
        model = UserProfile
        exclude=['activate','user','id','rolee']

    def validate_telephone(self,value):
        mobile = re.compile(r'^0[5-9][0-9]{8}')
        fix=re.compile(r'^0[2-9][0-9]{7}')
        if (not mobile.search(value)) and (not fix.search(value)):
             raise serializers.ValidationError( 'Numero de Telephone Invalide')
        return value



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['first_name','last_name','email']


    def validate_email(self,value):
        if value=="":
            raise serializers.ValidationError('veuillez entrez une adresse email')
        try:
            User.objects.get(email=self.email)
            raise serializers.ValidationError('veuillez entrer une autre adresse e-mail')
        except:
            pass
        return value
