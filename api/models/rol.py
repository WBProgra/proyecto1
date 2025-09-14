from django.db import models
from .base_model import BaseModel


class Rol(BaseModel):
    """
    Modelo para definir los roles de los usuarios en el sistema.
    Ejemplos: Administrador, Editor, Visitante.
    """
    nombre = models.CharField(
        max_length=100,
        unique=True,
        help_text="Nombre único del rol."
    )
    can_create_items = models.BooleanField(
        default=False,
        help_text="Permite al rol crear nuevos items."
    )
    can_update_items = models.BooleanField(
        default=False,
        help_text="Permite al rol editar items existentes."
    )
    can_delete_items = models.BooleanField(
        default=False,
        help_text="Permite al rol eliminar items."
    )
    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"
