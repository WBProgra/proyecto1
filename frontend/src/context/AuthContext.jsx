import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import apiClient from '../services/ApiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const { token, refreshToken } = response.data.data.tokenAuth;
      const tokens = { access: token, refresh: refreshToken };

      localStorage.setItem('authTokens', JSON.stringify(tokens));
      setAuthTokens(tokens);

      // Actualizar el token en el header de apiClient para la siguiente petición
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Después de obtener el token, pedimos los datos del usuario
      const userResponse = await AuthService.getMe();
      if (userResponse.data.errors) {
        throw new Error(userResponse.data.errors[0].message);
      }

      const userData = userResponse.data.data.me;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      navigate('/'); // Redirigir al dashboard
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      // Propagar el error para que el componente de login pueda manejarlo
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authTokens');
    delete apiClient.defaults.headers.common['Authorization'];
    navigate('/login');
  }, [navigate]);

  const contextData = {
    user,
    authTokens,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
