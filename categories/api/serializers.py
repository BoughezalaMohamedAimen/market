from rest_framework import serializers
from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    childs=serializers.ReadOnlyField(source='category_childs')
    sub_childs=serializers.ReadOnlyField(source='category_seconds_childs')

    class Meta:
        model = Category
        fields ='__all__'

class SimpleCatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields ='__all__'
