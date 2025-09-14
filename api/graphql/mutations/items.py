import graphene
from graphql import GraphQLError
from graphql_relay import from_global_id

from ..permissions import check_user_role
from api.models import Item
from ..schema.items import ItemNode as ItemType  # Usamos un alias


class CreateItemMutation(graphene.Mutation):
    """Crea un nuevo item."""
    class Arguments:
        nombre = graphene.String(required=True)
        descripcion = graphene.String()

    item = graphene.Field(ItemType)

    def mutate(self, info, nombre, descripcion=None):
        check_user_role(info.context.user, ["Admin", "Editor"])
        item = Item(nombre=nombre, descripcion=descripcion)
        item.save()
        return CreateItemMutation(item=item)


class UpdateItemMutation(graphene.Mutation):
    """Actualiza un item existente."""
    class Arguments:
        id = graphene.ID(required=True)
        nombre = graphene.String()
        descripcion = graphene.String()
        is_active = graphene.Boolean()

    item = graphene.Field(ItemType)

    def mutate(self, info, id, nombre=None, descripcion=None, is_active=None):
        check_user_role(info.context.user, ["Admin", "Editor"])
        try:
            # El ID de Relay debe ser decodificado
            real_id = from_global_id(id)[1]
            item = Item.objects.get(pk=real_id, is_deleted=False)

            if nombre is not None:
                item.nombre = nombre
            if descripcion is not None:
                item.descripcion = descripcion
            if is_active is not None:
                item.is_active = is_active
            item.save()
            return UpdateItemMutation(item=item)
        except Item.DoesNotExist:
            raise GraphQLError("El item no existe o ha sido eliminado.")


class DeleteItemMutation(graphene.Mutation):
    """Realiza un soft delete en un item."""
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        check_user_role(info.context.user, ["Admin"])
        try:
            real_id = from_global_id(id)[1]
            item = Item.objects.get(pk=real_id)
            item.delete()
            return DeleteItemMutation(success=True)
        except Item.DoesNotExist:
            raise GraphQLError("El item no existe o ha sido eliminado.")


class HardDeleteItemMutation(graphene.Mutation):
    """Realiza un hard delete (borrado físico) en un item."""
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        check_user_role(info.context.user, ["Admin"])
        try:
            real_id = from_global_id(id)[1]
            item = Item.objects.get(pk=real_id)
            item.hard_delete()
            return HardDeleteItemMutation(success=True)
        except Item.DoesNotExist:
            raise GraphQLError("El item no existe o ha sido eliminado.")


class ItemMutations(graphene.ObjectType):
    create_item = CreateItemMutation.Field()
    update_item = UpdateItemMutation.Field()
    delete_item = DeleteItemMutation.Field()
    hard_delete_item = HardDeleteItemMutation.Field()
