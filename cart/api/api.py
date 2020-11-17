from cart.models import Cart, CartItem
from .serializers import CartItemSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
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



class CartApi(APIView):
    authentication_classes=(TokenAuthentication,)

    def get(self,request,format=None):
        # print(f'cart api : user is {request.user.__str__() != "AnonymousUser"}')
        if is_authenticated(request):
            cart=get_user_cart(request)
        else:
            cart=get_anonymous_cart(request,request.GET.get("ses"))

        cart_items_json=CartItemSerializer(CartItem.objects.filter(cart=cart),many=True)
        return Response(cart_items_json.data, status=200)
        


class AddCartApi(APIView):
    authentication_classes=(TokenAuthentication,)
    # permission_classes=(IsAuthenticated,)


    def cart_item_exists(self,request,cart):
        cartitems=CartItem.objects.filter(cart=cart,post__id=request.data.get('post'))
        for atributevalue in request.data.get("attributevalues"):
            cartitems=cartitems.filter(attributevalues=atributevalue)

        return len(cartitems) > 0


    def post(self,request,format=None):
        if is_authenticated(request):
            cart=get_user_cart(request)
        else:
            cart=get_anonymous_cart(request,request.data.get("session"))

        print(f'attributes {request.data.get("attributevalues")}')


        if not self.cart_item_exists(request,cart):
            new_cart_item=CartItemSerializer(data=request.data)
            new_cart_item.set_cart(cart)
            if new_cart_item.is_valid():
                new_cart_item.save()
                return Response({"message":"add successful"}, status=201)
            else:
                return Response({"message":"invalid cart item "}, status=202)
        else:
            return Response({"message":"already exist"}, status=202)


class DeleteCartItemApi(APIView):
    authentication_classes=(TokenAuthentication,)

    def post(self,request,format=None):
        if is_authenticated(request):
            cart=get_user_cart(request)
        else:
            cart=get_anonymous_cart(request,request.data.get("session"))

        try:
            cart_item=CartItem.objects.get(id=request.data.get("id"))
            if cart_item.cart == cart:
                cart_item.delete()
                return Response({"message":"delete successful"}, status=200)
            else:
                return Response({"message":"not allowed"}, status=403)
        except CartItem.DoesNotExist:
               return Response({"message":"doesnt exist"}, status=404)

class CartItemQttApi(APIView):
    authentication_classes=(TokenAuthentication,)

    def post(self,request,format=None):
        if is_authenticated(request):
            cart=get_user_cart(request)
        else:
            cart=get_anonymous_cart(request,request.data.get("session"))

        try:
            cart_item=CartItem.objects.get(id=request.data.get("id"))
            if cart_item.cart == cart:
                cart_item.qtt=request.data.get("qtt")
                cart_item.save()
                return Response({"message":"update successful"}, status=200)
            else:
                return Response({"message":"not allowed"}, status=403)
        except CartItem.DoesNotExist:
               return Response({"message":"doesnt exist"}, status=404)
