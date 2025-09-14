from django.contrib.auth.models import AbstractUser
from django.db import models
from .base_model import BaseModel
from .rol import Rol
from .managers import CustomUserManager


class Usuario(AbstractUser, BaseModel):
    """
    Modelo de usuario personalizado que extiende el `AbstractUser` de Django.
    Usa el email como campo de autenticación principal.
    """
    # El username de AbstractUser se deshabilita asignando None.
    # username = None
    email = models.EmailField(
        unique=True, help_text="Dirección de correo electrónico única."
    )
    rol = models.ForeignKey(
        Rol,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="El rol asignado al usuario, que define sus permisos."
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.get_full_name() if self.get_full_name() else self.email

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
