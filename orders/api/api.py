from orders.models import Order
from .serializers import OrderSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



class OrderAPI(APIView):
    def post(self,request,format=None):
        serializer = OrderSerializer(data=request.data)
        serializer.set_the_user(request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderItemAPI(APIView):
    def post(self,request,format=None):
        serializer = OrderSerializer(data=request.data)
        serializer.set_the_user(request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
