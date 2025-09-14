// Importación de libraries
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./assets/css/App.css";

// Importación de services
import { refreshService } from "./services/UserServices";

// Importación de Context
import { useAuth } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

// Importación de theme
import theme from "../theme/theme";
import RoutesMain from "./routes/RoutesMain";

function App() {
  const { user, setUser, token, setToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (token && token.refresh) {
        try {
          const response = await refreshService(token.refresh);
          setToken(response);
          localStorage.setItem("authTokens", JSON.stringify(response));
        } catch (err) {
          // Si el refresh token falla, cerramos la sesión
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("authTokens");
          toast.error("Tu sesión ha expirado, por favor inicia sesión de nuevo");
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []); // Se ejecuta solo una vez al cargar la App

  if (loading && token) {
    // Muestra un loader solo si hay un token que verificar
    return <div>Verificando sesión...</div>;
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        <RoutesMain />
        <Toaster />
      </ChakraProvider>
    </>
  );
}

export default App;
