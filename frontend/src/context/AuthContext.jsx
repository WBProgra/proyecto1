import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, logoutService } from "../services/UserServices";
import toast from "react-hot-toast";

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
        toast.success("Inicio de sesión exitoso");
        setUser(response.user);
        setToken({ refresh: response.refreshToken, access: response.token });
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem(
          "authTokens",
          JSON.stringify({
            refresh: response.refreshToken,
            access: response.token,
          })
        );
        navigate("/"); // Redirigir al dashboard
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        toast.error(error.message || "Hubo un problema al iniciar sesión.");
        // Propagar el error para que el componente de login pueda manejarlo
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    if (token) {
      logoutService({ refresh: token.refresh }).catch((err) => {
        console.error("Fallo el cierre de sesión en el servidor:", err);
      });
    }
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
