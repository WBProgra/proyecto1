import pytest
import json
from django.test import Client
from api.models import Item, Usuario, Rol


@pytest.fixture
def api_client():
    """Fixture para proporcionar un cliente de API de Django."""
    return Client()


@pytest.fixture
def test_user(db):
    """Fixture para crear un usuario de prueba."""
    rol = Rol.objects.create(nombre="Editor")
    return Usuario.objects.create_user(
        email="testuser@example.com", password="password123", rol=rol
    )


@pytest.fixture
def auth_headers(api_client, test_user):
    """
    Fixture para obtener un token JWT y devolver las cabeceras de autorización.
    """
    mutation = """
        mutation TokenAuth($username: String!, $password: String!) {
            tokenAuth(username: $username, password: $password) {
                token
            }
        }
    """
    variables = {"email": "testuser@example.com", "password": "password123"}
    data = {"query": mutation, "variables": variables}
    response = api_client.post(
        "/graphql/", json.dumps(data), content_type="application/json"
    )

    # Verificar que la obtención del token fue exitosa
    assert response.status_code == 200
    content = response.json()
    assert "errors" not in content, (
        f"Error al obtener el token: {content.get('errors')}"
    )

    token = content['data']['tokenAuth']['token']
    return {"HTTP_AUTHORIZATION": f"JWT {token}"}


@pytest.mark.django_db
def test_all_items_query_unauthenticated(api_client):
    """Prueba que un usuario no autenticado no puede consultar items."""
    query = "{ allItems { edges { node { id nombre } } } }"
    data = {"query": query}
    response = api_client.post(
        "/graphql/", json.dumps(data), content_type="application/json"
    )

    content = response.json()
    assert "errors" in content
    assert content['errors'][0]['message'] == (
        "Debes iniciar sesión para realizar esta acción."
    )


@pytest.mark.django_db
def test_all_items_query_authenticated(api_client, auth_headers):
    """Prueba que un usuario autenticado puede consultar items."""
    Item.objects.create(nombre="Test Item 1", descripcion="Descripción 1")

    query = "{ allItems { edges { node { id nombre } } } }"
    data = {"query": query}

    response = api_client.post(
        "/graphql/",
        json.dumps(data),
        content_type="application/json",
        **auth_headers
    )

    content = response.json()
    assert "errors" not in content, (
        f"La consulta autenticada falló: {content.get('errors')}"
    )

    results = content['data']['allItems']['edges']
    assert len(results) == 1
    assert results[0]['node']['nombre'] == "Test Item 1"
