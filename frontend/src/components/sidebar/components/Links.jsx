/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// routes
import { routes } from "../../../routes/routes";
import { useAuth } from "../../../context/AuthContext";

export function SidebarLinks() {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let activeIcon = useColorModeValue("brand.500", "brand.500");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };

  // context del usuario
  const { user } = useAuth();

  // --- INICIO DE LA CORRECCIÓN ---

  // Se crea una función de validación más clara y robusta.
  const hasAccess = (route) => {
    // 1. El superusuario SIEMPRE tiene acceso a todo.
    // Esta es la verificación prioritaria que soluciona tu problema.
    if (user?.isSuperuser) {
      return true;
    }

    // 2. Si la ruta no requiere un rol específico, se permite el acceso a cualquier usuario logueado.
    if (!route.accessValidate || route.accessValidate.length === 0) {
      return true;
    }

    // 3. Se comprueba si el NOMBRE del rol del usuario está en la lista de roles permitidos.
    // Se accede a user.rol.nombre para la comparación, que es la forma correcta.
    return user?.rol?.nombre && route.accessValidate.includes(user.rol.nombre);
  };

  // Se filtra primero la lista de rutas que se deben mostrar en la barra lateral.
  const routesSidebar = routes.filter(
    (route) => route.showSidebar && hasAccess(route)
  );
  // --- FIN DE LA CORRECCIÓN ---

  return routesSidebar.map((route, key) => {
    return (
      <NavLink to={route.path} key={key}>
        <Box>
          <HStack
            spacing={activeRoute(route.path) ? "22px" : "26px"}
            py="5px"
            ps="10px"
          >
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box
                color={activeRoute(route.path) ? activeIcon : textColor}
                me="18px"
              >
                <Icon
                  as={route.icon}
                  width="20px"
                  height="20px"
                  color="inherit"
                />
              </Box>
              <Text
                me="auto"
                color={activeRoute(route.path) ? activeColor : textColor}
                fontWeight={activeRoute(route.path) ? "bold" : "normal"}
              >
                {route.name}
              </Text>
            </Flex>
            <Box
              h="36px"
              w="4px"
              bg={activeRoute(route.path) ? brandColor : "transparent"}
              borderRadius="5px"
            />
          </HStack>
        </Box>
      </NavLink>
    );
  });
}

export default SidebarLinks;

