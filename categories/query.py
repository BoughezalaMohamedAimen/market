import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Category


class CategoryNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Category
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'parent': ['exact','isnull'],
        }
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    all_categorys=DjangoFilterConnectionField(CategoryNode)
