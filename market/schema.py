import graphene
from posts.schema import schema as posts_schema
from categories.schema import schema as categories_schema
from regions.schema import schema as regions_schema
import graphql_jwt

class Query(posts_schema.Query,categories_schema.Query,regions_schema.Query,graphene.ObjectType):
    # hello = graphene.String(default_value="Hi!")
    pass

class Mutation(posts_schema.Mutation,graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)
