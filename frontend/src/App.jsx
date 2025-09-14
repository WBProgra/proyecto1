// Importación de libraries
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./assets/css/App.css";

// Importación de Pages
import LoginPage from "./pages/public/LoginScreen/LoginPage";

// Importación de services
import { refreshService } from "./services/UserServices";

// Importación de Context
import { useAuth } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

// Importación de theme
import theme from "../theme/theme";
import RoutesMain from "./routes/RoutesMain";

function App() {
  const { setUser, token, setToken } = useAuth();

  const [checkedToken, setCheckedToken] = useState(false);

  useEffect(() => {
    if (token && !checkedToken) {
      refreshService({ refresh: token.refresh })
        .then((response) => {
          setToken(response);
          localStorage.setItem("authTokens", JSON.stringify(response));
        })
        .catch((err) => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("authTokens");
          toast.error("Your session has expired, please login again");
        })
        .finally(() => {
          setCheckedToken(true);
        });
    }
  }, [token, checkedToken]);

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
