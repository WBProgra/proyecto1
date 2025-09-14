import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from api.models import Item
from ..permissions import check_is_authenticated

class ItemNode(DjangoObjectType):
    """
    Nodo de Relay para el modelo Item.
    Se usa para la paginación y la identificación global de objetos.
    """
    class Meta:
        model = Item
        fields = "__all__"
        filter_fields = {
            'nombre': ['exact', 'icontains', 'istartswith'],
            'is_active': ['exact'],
        }
        interfaces = (relay.Node,)

class ItemQuery(graphene.ObjectType):
    """Consultas relacionadas con el modelo Item."""

    # Esta consulta ahora soporta paginación y filtrado.
    all_items = DjangoFilterConnectionField(ItemNode)

    # Mantenemos una consulta simple para obtener un item por su ID de Relay.
    item = relay.Node.Field(ItemNode)

    def resolve_all_items(self, info, **kwargs):
        check_is_authenticated(info.context.user)
        # El filtrado de is_deleted se aplica aquí para asegurar que no se muestren.
        return Item.objects.filter(is_deleted=False)
