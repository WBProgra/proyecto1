from django.db import models
from .base_model import BaseModel


class Item(BaseModel):
    """
    Modelo de ejemplo para demostrar las funcionalidades de la plantilla.
    Representa un item genérico con un nombre y una descripción.
    """
    nombre = models.CharField(
        max_length=255, help_text="Nombre del item."
    )
    descripcion = models.TextField(
        blank=True, null=True, help_text="Descripción del item."
    )

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
