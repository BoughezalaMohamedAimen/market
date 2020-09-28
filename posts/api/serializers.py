from rest_framework import serializers
from posts.models import Post,Attribute,AttributeValue,PostLivraison


class PostSerializer(serializers.ModelSerializer):
    postuser=serializers.ReadOnlyField(source='post_user')
    postattributes=serializers.ReadOnlyField(source='post_attributes')
    livraison=serializers.ReadOnlyField(source='post_livraison')

    class Meta:
        model = Post
        fields ='__all__'


class PostLivraisonSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLivraison
        fields ='__all__'

class AttributeSerializer(serializers.ModelSerializer):
    values=serializers.ReadOnlyField(source='attribute_values')
    class Meta:
        model = Attribute
        fields ='__all__'


class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields ='__all__'
