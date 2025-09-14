// Importación de apiClient
import apiClient from "./ApiClient";

// Importación de servicios individuales
import { refreshService } from "./UserServices/refreshService";

// --- MUTATIONS ---

const LOGIN_MUTATION = `
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
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
  console.log("TCL: loginService -> data", data)
  const response = await apiClient.post("/graphql/", {
    query: LOGIN_MUTATION,
    variables: {
      username: data.username,
      password: data.password,
    },
  });

  if (response.data.errors) {
    // Lanza el primer error encontrado para ser manejado por el componente
    throw new Error(response.data.errors[0].message);
  }

  // Devuelve todo el payload de tokenAuth
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

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }
  return response.data.data.deleteRefreshTokenCookie;
};

// Re-exportamos refreshService para mantenerlo en el mismo módulo
export { refreshService };
