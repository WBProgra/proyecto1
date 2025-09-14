import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, logoutService } from "../services/UserServices";
import { showSuccess, handleError } from "../services/NotificationService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const navigate = useNavigate();

  const login = useCallback(
    async (data) => {
      try {
        const response = await loginService(data);
        console.log("TCL: AuthProvider -> response", response)

        // --- INICIO DE LA CORRECCIÓN ---
        // Se añade una validación para asegurar que la respuesta del login es exitosa
        // y contiene los datos necesarios antes de proceder.
        if (response && response.token && response.user) {


          const tokens = { access: response.token, refresh: response.refreshToken };
          
          // Actualiza el estado y localStorage en un solo paso.
          setUser(response.user);
          setToken(tokens);
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("authTokens", JSON.stringify(tokens));
          
          navigate("/"); // Redirige al dashboard.
        } else {
          // Si la respuesta no es la esperada (por ejemplo, login fallido),
          // se lanza un error para que sea gestionado por el bloque catch.
          throw new Error("Credenciales inválidas o respuesta inesperada del servidor.");
        }
        // --- FIN DE LA CORRECCIÓN ---
      } catch (error) {
        // El servicio de notificaciones se encarga de mostrar el error.
        handleError(error);
        throw error; // Propaga el error para que el componente de login pueda detener su estado de carga.
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    if (token) {
      logoutService({ refresh: token.refresh }).catch((err) => {
        // Aunque falle la llamada al backend, el logout en el frontend se completa.
        console.error("Fallo el cierre de sesión en el servidor:", err);
      });
    }
    // Limpia el estado y el localStorage.
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authTokens");
    navigate("/login");
  }, [navigate, token]);

  const contextData = {
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};