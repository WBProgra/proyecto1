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
    const pathname = location.pathname;
    return pathname === routeName;
  };

  // context del usuario
  const { user } = useAuth();

  const routesSidebar = routes.filter((route) => route.showSidebar);
  console.log("TCL: SidebarLinks -> routesSidebar", routesSidebar)

  return routesSidebar.map((route, key) => {
    return (
      (route.accessValidate.includes(user?.rol) || user?.is_superuser) && (
        <NavLink to={`${route.path}`} key={key}>
          <Box>
            <HStack
              spacing={activeRoute(`${route.path}`) ? "22px" : "26px"}
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    activeRoute(`${route.path}`) ? activeIcon : textColor
                  }
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
                  color={
                    activeRoute(`${route.path}`) ? activeColor : textColor
                  }
                  fontWeight={
                    activeRoute(`${route.path}`) ? "bold" : "normal"
                  }
                >
                  {route.name}
                </Text>
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={
                  activeRoute(`${route.path}`) ? brandColor : "transparent"
                }
                borderRadius="5px"
              />
            </HStack>
          </Box>
        </NavLink>
      )
    );
  });
}

export default SidebarLinks;
