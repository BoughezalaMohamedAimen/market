from categories.models import Category
from .serializers import CategorySerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



class CategoryAPI(APIView):
    def get(self,request,format=None):
        categorys_list=Category.objects.all().order_by('parent')
        categorys_json=CategorySerializer(categorys_list,many=True)
        return Response(categorys_json.data, status=200)
