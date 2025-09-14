import graphene

from .graphql.schema.items import ItemQuery
from .graphql.schema.users import UserQuery
from .graphql.mutations.items import ItemMutations
from .graphql.mutations.auth import AuthMutations


class Query(ItemQuery, UserQuery, graphene.ObjectType):
    """
    Combina todas las consultas de la aplicación.
    """
    pass


class Mutation(ItemMutations, AuthMutations, graphene.ObjectType):
    """
    Combina todas las mutaciones de la aplicación.
    """
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
