
import graphene
from graphene_django.rest_framework.mutation import SerializerMutation
from .api.serializers import PostSerializer
from .models import Post

class PostMutation(SerializerMutation):
    class Meta:
        serializer_class = PostSerializer
        model_operations = ['create', 'update']
        lookup_field = 'id'

    @classmethod
    def get_serializer_kwargs(cls, root, info, **input):
        print(input)
        if 'id' in input:
            # instance = Post.objects.filter(
            #     id=input['id'], owner=info.context.user
            # ).first()
            instance=Post.objects.get(id=input['id'])
            if instance:
                return {'instance': instance, 'data': input, 'partial': True}

            else:
                raise http.Http404

        return {'data': input, 'partial': True}

class Mutation(graphene.ObjectType):
    update_post = PostMutation.Field()
