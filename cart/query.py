import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import *




class CartItemNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    filter_fields={
        'cart':['exact',]
    }
    class Meta:
        model = CartItem
        interfaces = (relay.Node, )


class CartNode(DjangoObjectType):
    dbid = graphene.ID(source='pk', required=True)
    class Meta:
        model = Cart
        filter_fields = {
            'user': ['exact',],
            'session': ['exact', ],
        }
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    cart=graphene.Field(CartNode,session=graphene.String(required=False))

    def resolve_cart(root ,info ,**args):
        if info.context.user.is_authenticated:
            return return Cart.objects.get(user=info.context.user)
        else:
            try:
                return Cart.objects.get(session=args.get('session'))
            except:
                return None
