import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import *


class PaysNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Pays
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (relay.Node, )

class WilayaNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Wilaya
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'pays': ['exact',],
        }
        interfaces = (relay.Node, )


class CommuneNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Commune
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'wilaya': ['exact',],
        }
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    all_countries=DjangoFilterConnectionField(PaysNode)
    all_wilayas=DjangoFilterConnectionField(WilayaNode)
    all_cities=DjangoFilterConnectionField(CommuneNode)
