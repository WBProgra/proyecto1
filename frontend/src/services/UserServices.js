import apiClient from "./ApiClient";
import { refreshService } from "./UserServices/refreshService";

// --- MUTATIONS ---

const LOGIN_MUTATION = `
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      user {
        id
        username
        email
        firstName
        lastName
        isSuperuser
        rol {
          id
          nombre
        }
      }
    }
  }
`;

const LOGOUT_MUTATION = `
  mutation DeleteRefreshTokenCookie($refreshToken: String!) {
    deleteRefreshTokenCookie(refreshToken: $refreshToken) {
      deleted
    }
  }
`;

// --- SERVICES ---

/**
 * Servicio para iniciar sesión de un usuario.
 * @param {object} data - Contiene 'username' y 'password'.
 */
export const loginService = async (data) => {
  const response = await apiClient.post("/graphql/", {
    query: LOGIN_MUTATION,
    variables: {
      username: data.username,
      password: data.password,
    },
  });
  // El interceptor de Axios se encargará de lanzar un error si la respuesta contiene errores GraphQL.
  return response.data.data.tokenAuth;
};


/**
 * Servicio para cerrar la sesión de un usuario.
 * @param {object} data - Contiene el 'refresh' token.
 */
export const logoutService = async (data) => {
    const response = await apiClient.post("/graphql/", {
        query: LOGOUT_MUTATION,
        variables: {
            refreshToken: data.refresh,
        },
    });
    return response.data.data.deleteRefreshTokenCookie;
};

// Re-exportamos refreshService para mantenerlo en el mismo módulo
export { refreshService };