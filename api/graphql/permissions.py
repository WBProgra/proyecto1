from graphql import GraphQLError

def is_authenticated(func):
    """
    Decorador para verificar que el usuario está autenticado.
    """
    def wrapper(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            raise GraphQLError("Debes iniciar sesión para realizar esta acción.")
        return func(self, info, **kwargs)
    return wrapper

def is_superuser(func):
    """
    Decorador para verificar que el usuario es un superusuario.
    """
    def wrapper(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_superuser:
            raise GraphQLError("No tienes permisos de administrador para realizar esta acción.")
        return func(self, info, **kwargs)
    return wrapper

# También se pueden definir como funciones simples para usar dentro de los resolvers
def check_is_authenticated(user):
    if not user.is_authenticated:
        raise GraphQLError("Debes iniciar sesión para realizar esta acción.")

def check_is_superuser(user):
    if not user.is_authenticated or not user.is_superuser:
        raise GraphQLError("No tienes permisos de administrador para realizar esta acción.")
