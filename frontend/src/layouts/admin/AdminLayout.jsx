// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Layout components
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes/routes";

// Custom Chakra theme
export default function AdminLayout(props) {
  const { ...rest } = props;
  const { user } = useAuth(); // Obtiene el usuario para la validación
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para el menú móvil

  // --- LÓGICA DE ACCESO ---
  // Replicamos la lógica de PrivateRoutes para obtener la ruta activa
  const hasAccess = (route) => {
    if (user?.isSuperuser) return true;
    if (!route.accessValidate || route.accessValidate.length === 0) return true;
    return user?.rol?.nombre && route.accessValidate.includes(user.rol.nombre);
  };

  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Dashboard"; // Un nombre por defecto
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (hasAccess(prop)) {
        return (
          <Route path={prop.path} element={<prop.component />} key={key} />
        );
      }
      return null;
    });
  };

  return (
    <Box>
      <Sidebar routes={routes} isOpen={isOpen} onClose={onClose} />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
      >
        <Portal>
          <Box>
            <NavbarAdmin
              onOpen={onOpen}
              logoText={"Horizon UI Dashboard PRO"}
              brandText={getActiveRoute(routes)}
              {...rest}
            />
          </Box>
        </Portal>

        <Box
          mx="auto"
          p={{ base: "20px", md: "30px" }}
          pe="20px"
          minH="100vh"
          pt="50px"
        >
          {/* El contenido de la página se renderiza aquí */}
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

