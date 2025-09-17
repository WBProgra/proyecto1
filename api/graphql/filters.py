# api/graphql/filters.py

import django_filters
from django.db.models import Q
from ..models import Item

class ItemFilter(django_filters.FilterSet):
    """Filtros personalizados para el modelo Item."""

    # 1. Filtro para el rango de fechas de creación
    created_after = django_filters.DateFilter(field_name='created', lookup_expr='gte')
    created_before = django_filters.DateFilter(field_name='created', lookup_expr='lte')

    # 2. Filtro de búsqueda por nombre O ID
    # Usamos un método personalizado para buscar en múltiples campos.
    search = django_filters.CharFilter(method='filter_by_search', label="Buscar por nombre o ID")

    class Meta:
        model = Item
        fields = {
            'nombre': ['icontains'], # Mantenemos el filtro por nombre
            'is_active': ['exact'],     # y por estado
        }

    def filter_by_search(self, queryset, name, value):
        """
        Este método se ejecuta cuando se usa el filtro 'search'.
        Busca el valor 'value' en el campo 'nombre' O en el campo 'id'.
        """
        # Usamos Q objects para una consulta OR
        return queryset.filter(
            Q(nombre__icontains=value) | Q(id__icontains=value)
        )