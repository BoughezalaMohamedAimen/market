import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import *


class AttributeNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Attribute
        interfaces = (relay.Node, )

class AttributeValueNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = AttributeValue
        interfaces = (relay.Node, )


class PostNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Post
        filter_fields = {
            'title': ['exact', 'icontains'],
            'description': ['exact', 'icontains'],
            'category': ['exact','in'],
            'price': ['gte','lte'],
            'category__name': ['exact'],
        }
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    all_posts=DjangoFilterConnectionField(PostNode)
