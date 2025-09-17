import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from api.models import Item
from ..permissions import check_user_role
from ..filters import ItemFilter


class ItemNode(DjangoObjectType):
    """
    Nodo de Relay para el modelo Item.
    Se usa para la paginación y la identificación global de objetos.
    """
    class Meta:
        model = Item
        fields = "__all__"
        interfaces = (relay.Node,)


class ItemQuery(graphene.ObjectType):
    """Consultas relacionadas con el modelo Item."""

    # Esta consulta ahora soporta paginación y filtrado.
    all_items = DjangoFilterConnectionField(ItemNode, filterset_class=ItemFilter)

    # Mantenemos una consulta simple para obtener un item por su ID de Relay.
    item = relay.Node.Field(ItemNode)

    def resolve_all_items(self, info, **kwargs):
        # check_user_role(info.context.user, ["Admin", "Editor", "Viewer"])
        # El filtrado de is_deleted se aplica aquí para asegurar que no se
        # muestren.
        print("\n[DEBUG] 1. Entrando a resolve_all_items con argumentos:", kwargs)
        return Item.objects.filter(is_deleted=False)
