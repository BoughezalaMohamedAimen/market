from rest_framework import serializers
from orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    # childs=serializers.ReadOnlyField(source='Category_childs')

    class Meta:
        model = Order
        fields ='__all__'
