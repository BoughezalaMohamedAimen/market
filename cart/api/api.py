from cart.models import Cart, CartItem
from .serializers import CartItemSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



class CartApi(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self,request,format=None):
        if request.user.is_authenticated:
            try:
                cart=Cart.objects.get(user=request.user)
            except:
                cart = Cart(user=request.user)
                cart=cart.save()
        else:
            try:
                cart=Cart.objects.get(session_key = request.session.session_key)
            except:
                request.session.save()
                cart = Cart(session_key=request.session.session_key)
                cart=cart.save()

        attr_json=CartItemSerializer(CartItem.objects.filter(cart=cart),many=True)
        return Response(attr_json.data, status=200)
