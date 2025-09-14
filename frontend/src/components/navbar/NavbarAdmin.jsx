import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import NavbarLinksAdmin from "./NavbarLinksAdmin";

// La barra de navegación superior que contiene el título y el menú móvil
export default function NavbarAdmin(props) {
  const { brandText, onOpen } = props;

  // Estilos
  const navbarIcon = useColorModeValue("gray.400", "white");
  const mainText = useColorModeValue("navy.700", "white");

  return (
    <Box
      position="fixed"
      boxShadow="sm"
      bg={useColorModeValue("white", "navy.800")}
      borderColor="transparent"
      filter="none"
      backdropFilter="blur(20px)"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration="0.2s, 0.2s, 0.2s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
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
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "row",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb="0px"
      >
        {/* --- Menú Hamburguesa (solo visible en móvil) --- */}
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

        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <NavbarLinksAdmin />
        </Box>
      </Flex>
    </Box>
  );
}
