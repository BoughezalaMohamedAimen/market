from accounts.models import UserProfile
from django.contrib.auth.models import User
from .serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from django.db.models import Q




class UserProfileApi(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    def pagination_response(self,users,serializer,users_length):
        response={
        'pages':users.paginator.num_pages,
        'result':serializer.data,
        "length":users_length
        }
        try:
            response['previous']=users.previous_page_number()
        except:
            pass
        try:
            response['next']=users.next_page_number()
        except:
            pass
        return response


    def get(self,request,format=None):
        page = request.GET.get('page')
        filters={}
        q = Q()

        if  request.GET.get("pays") and request.GET.get("pays")!="0" :
            filters['commune__wilaya__pays__id']=request.GET.get("pays")

        if  request.GET.get("wilaya") and request.GET.get("wilaya")!="0" :
            filters['commune__wilaya__id']=request.GET.get("wilaya")

        if  request.GET.get("commune") and request.GET.get("commune")!="0" :
            filters['commune__id']=request.GET.get("commune")


        if request.GET.get('spec'):
            filters["specialite"]=request.GET.get('spec')

        if  request.GET.get("commercial") and request.GET.get("commercial")!="" :
            q |= Q(user__first_name__icontains=request.GET.get("commercial"))
            q |= Q(user__last_name__icontains=request.GET.get("commercial"))



        users_list=UserProfile.objects.filter(**filters).order_by("-user__first_name")

        if q:
            users_list=users_list.filter(q)

        paginator = Paginator(users_list, 1)
        users=paginator.get_page(page)

        serializer=UserProfileSerializer(users,many=True)

        return Response(self.pagination_response(users,serializer,len(users_list)), status=200)



class SpecialiteApi(APIView):
    def get(self,request,format=None):
        content = [
            {'id':1,'name':'Généraliste'},
            {'id':2,'name':'Diabetologue'},
            {'id':3,'name':'Neurologue'},
            {'id':4,'name':'Psychologue'},
            {'id':5,'name':'Gynécologue'},
            {'id':6,'name':'Rumathologue'},
            {'id':7,'name':'Allergologue'},
            {'id':8,'name':'Phtisio'},
            {'id':9,'name':'Cardiologue'},
            {'id':10,'name':'Urologue'},
            {'id':11,'name':'Hematologue'},
            {'id':12,'name':'Orthopedie'},
            {'id':13,'name':'Nutritionist'},
            {'id':14,'name':'Dermatologue'},
            {'id':15,'name':'Pharmacie'},
            {'id':16,'name':'Grossiste'},
            ]
        return Response(content)

class ClassificationsApi(APIView):
    def get(self,request,format=None):
        content = [
            {'id':1,'name':'a'},
            {'id':2,'name':'b'},
            {'id':3,'name':'c'},
            {'id':4,'name':'d'},
            {'id':5,'name':'e'},
            {'id':6,'name':'f'},
            {'id':7,'name':'g'},
            {'id':8,'name':'p'},
            ]
        return Response(content)


class AccountApi(APIView):
    def get(self,request,format=None):
        return Response({'id':request.user.id,'name':request.user.username})

class EditProfileApi(APIView):
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)
    def get(self,request,format=None):
        # serializer=EditProfileSerializer(request.user.userprofile)
        serializer=EditProfileSerializer(UserProfile.objects.get(user=request.user))
        return Response(serializer.data)

    def post(self,request,format=None):
        user_serializer = UserSerializer(request.user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

        serializer = EditProfileSerializer(request.user.userprofile, data=request.data)
        # serializer = EditProfileSerializer(UserProfile.objects.get(id=1), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditUserApi(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserSerializer(request.user, data=request.data)
        # serializer=UserSerializer(User.objects.get(id=1), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
