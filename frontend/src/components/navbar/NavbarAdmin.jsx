import React from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import NavbarLinksAdmin from "./NavbarLinksAdmin";
import Breadcrumbs from "./Breadcrumbs";

export default function NavbarAdmin(props) {
  const { onOpen } = props;
  const navbarIcon = useColorModeValue("gray.400", "white");

  return (
    <Box
      position="fixed"
      boxShadow="sm"
      bg={useColorModeValue("whiteAlpha.900", "navy.800")}
      borderColor="transparent"
      backdropFilter="blur(20px)"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration="0.2s, 0.2s, 0.2s, 0s"
      alignItems={{ xl: "center" }}
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt="10px"
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: "15px",
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "18px" }}
      w={{
        base: "calc(100vw - 24px)",
        md: "calc(100vw - 60px)",
        lg: "calc(100vw - 60px)",
        xl: "calc(100vw - 350px)",
      }}
      zIndex="1100" // <-- SE AÑADE Z-INDEX PARA GARANTIZAR LA SUPERPOSICIÓN
    >
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
      >
        <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
          <Flex onClick={onOpen} cursor="pointer">
            <Icon
              as={IoMenuOutline}
              color={navbarIcon}
              w="30px"
              h="30px"
            />
          </Flex>
        </Flex>
        {/* Añade el componente de Breadcrumbs aquí */}
        <Box display={{ base: "none", md: "block" }}>
          <Breadcrumbs />
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <NavbarLinksAdmin />
        </Box>
      </Flex>
    </Box>
  );
}