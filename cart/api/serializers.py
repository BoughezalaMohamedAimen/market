from rest_framework import serializers
from cart.models import CartItem
from django.db.models import Count



class CartItemSerializer(serializers.ModelSerializer):
    details=serializers.ReadOnlyField(source='post_details')
    attributes_details=serializers.ReadOnlyField(source='item_attributes_details')
    total=serializers.ReadOnlyField(source='item_total')
    class Meta:
        model = CartItem
        exclude =['cart',]

    def set_cart(self,cart):
        self.cart=cart


    def create(self, validated_data):
        validated_data["cart"] = self.cart
        return super().create(validated_data)


    # def exist(self):
    #     cart_items= CartItem.objects.filter(attributevalues__in=self.attributevalues,cart=self.cart)
    #     print(f' the length is *********** {len(cart_items)}')
    #
    # def validate_attributevalues(self,value):
    #     cart_items= CartItem.objects.filter(attributevalues__in=value,cart=self.cart)
    #     print(f' the length is *********** {len(cart_items)}')
    #
    #     print(f' the value is {self.cart}')
    #     try:
    #         CartItem.objects.filter(attributevalues=value,cart=self.cart)
    #         print("can be added")
    #         return value
    #     except Exception as e:
    #         print(e)
    #         raise serializers.ValidationError( 'already exist in cart ')
