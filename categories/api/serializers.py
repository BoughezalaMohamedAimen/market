from rest_framework import serializers
from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    # childs=serializers.ReadOnlyField(source='Category_childs')

    class Meta:
        model = Category
        fields ='__all__'
