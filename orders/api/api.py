from orders.models import Order
from .serializers import OrderSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from cart.models import Cart
from accounts.models import AnonymousSession


def is_authenticated(request):
    return request.user.__str__() != 'AnonymousUser'

def get_user_cart(request):
    try:
        cart=Cart.objects.get(user=request.user)
    except  Cart.DoesNotExist:
        cart=Cart(user=request.user)
        cart=cart.save()
    return cart

def get_anonymous_cart(request,session):
    try:
        cart=Cart.objects.get(session__session=session,user=None)
    except  Cart.DoesNotExist:
        cart=Cart(session=AnonymousSession.objects.get(session=session))
        cart=cart.save()
    return cart


class OrderAPI(APIView):
    def post(self,request,format=None):
            cart=get_user_cart(request) if is_authenticated(request) else get_anonymous_cart(request,request.GET.get("ses"))

            if cart.can_be_order():
                serializer = OrderSerializer(data=request.data)
                if is_authenticated(request):
                    serializer.set_the_user(request.user)

                if serializer.is_valid():
                    order=serializer.save()
                    cart.cart_to_order(order)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"error":"empty cart"}, status=403)


class OrderItemAPI(APIView):
    def post(self,request,format=None):
        serializer = OrderSerializer(data=request.data)
        serializer.set_the_user(request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
