from graphql import GraphQLError


def is_authenticated(func):
    """
    Decorador para verificar que el usuario está autenticado.
    """
    def wrapper(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            raise GraphQLError(
                "Debes iniciar sesión para realizar esta acción."
            )
        return func(self, info, **kwargs)
    return wrapper


def is_superuser(func):
    """
    Decorador para verificar que el usuario es un superusuario.
    """
    def wrapper(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_superuser:
            raise GraphQLError(
                "No tienes permisos de administrador para realizar esta acción."
            )
        return func(self, info, **kwargs)
    return wrapper


def check_is_authenticated(user):
    if not user.is_authenticated:
        raise GraphQLError("Debes iniciar sesión para realizar esta acción.")


def check_is_superuser(user):
    if not user.is_authenticated or not user.is_superuser:
        raise GraphQLError(
            "No tienes permisos de administrador para realizar esta acción."
        )


def check_user_role(user, allowed_roles: list):
    """
    Verifica si el usuario tiene uno de los roles permitidos.
    """
    check_is_authenticated(user)
    if not user.rol or user.rol.nombre not in allowed_roles:
        raise GraphQLError(
            "No tienes los permisos necesarios para realizar esta acción."
        )


def has_role(allowed_roles: list):
    """
    Decorador para verificar que el usuario tiene uno de los roles permitidos.
    """
    def decorator(func):
        def wrapper(self, info, **kwargs):
            check_user_role(info.context.user, allowed_roles)
            return func(self, info, **kwargs)
        return wrapper
    return decorator
