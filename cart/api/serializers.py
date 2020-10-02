from rest_framework import serializers
from cart.models import CartItem




class CartItemSerializer(serializers.ModelSerializer):
    details=serializers.ReadOnlyField(source='post_details')
    class Meta:
        model = CartItem
        fields ='__all__'
