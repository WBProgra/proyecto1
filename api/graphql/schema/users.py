import graphene
from graphene_django import DjangoObjectType
from ..permissions import check_is_authenticated, check_is_superuser

from api.models import Usuario, Rol

class UsuarioType(DjangoObjectType):
    """Tipo de dato para el modelo Usuario."""
    class Meta:
        model = Usuario
        exclude = ("password",)

class RolType(DjangoObjectType):
    """Tipo de dato para el modelo Rol."""
    class Meta:
        model = Rol
        fields = ("id", "nombre")

class UserQuery(graphene.ObjectType):
    """Consultas relacionadas con el modelo Usuario."""
    all_users = graphene.List(UsuarioType)
    me = graphene.Field(UsuarioType)

    def resolve_all_users(self, info):
        check_is_superuser(info.context.user)
        return Usuario.objects.filter(is_deleted=False)

    def resolve_me(self, info):
        check_is_authenticated(info.context.user)
        return info.context.user
