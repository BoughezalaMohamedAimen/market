from cart.models import Cart, CartItem
from .serializers import CartItemSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



class CartApi(APIView):
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)

    def get(self,request,format=None):
        try:
            cart=Cart.objects.get(user=request.user)
        except  Cart.DoesNotExist:
            cart = Cart(user=request.user)
            cart=cart.save()

        attr_json=CartItemSerializer(CartItem.objects.filter(cart=cart),many=True)
        return Response(attr_json.data, status=200)



class AddCartApi(APIView):
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)

    def get(self,request,format=None):
        try:
            cart=Cart.objects.get(user=request.user)
        except  Cart.DoesNotExist:
            cart = Cart(user=request.user)
            cart=cart.save()

        new_cart_item=CartItemSerializer(request.post)
        new_cart_item.set_cart(request.user.cart)
        if new_cart_item.is_valid():
            new_cart_item.save()
            return Response(new_cart_item.data, status=201)

        return Response(attr_json.data, status=200)
