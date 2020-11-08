from posts.models import Post,Attribute
from .serializers import PostSerializer,AttributeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from django.core.paginator import Paginator

from posts.filters import GetPosts

class PostAPI(APIView):
    def pagination_response(self,posts,json,result_length):
        response={
        'pages':posts.paginator.num_pages,
        'result':json.data,
        'length':result_length,
        }
        try:
            response['previous']=posts.previous_page_number()
        except:
            pass
        try:
            response['next']=posts.next_page_number()
        except:
            pass
        return response

    def get(self,request,format=None):
        posts_list=GetPosts(request)
        paginator = Paginator(posts_list, 10)
        page = request.GET.get('page')
        posts=paginator.get_page(page)
        posts_json=PostSerializer(posts,many=True)


        return Response(self.pagination_response(posts,posts_json,len(posts_list)), status=200)


class AttAPI(APIView):

    def get(self,request,format=None):
        attr_json=AttributeSerializer(Attribute.objects.filter(is_related=False),many=True)
        return Response(attr_json.data, status=200)
