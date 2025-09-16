// Chakra Imports
import {
  Avatar,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import SearchBar from "./searchBar/SearchBar";
import React from "react";
// Assets
import { SidebarResponsive } from "../sidebar/Sidebar";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const NavbarLinksAdmin = (props) => {
  const { user, logout } = useAuth();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap="unset"
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      {/* <SearchBar mb="unset" me="10px" borderRadius="30px" /> */}
      <SidebarResponsive />

      <Menu>
        <MenuButton p="0px" onClick={toggleColorMode}>
          <Icon
            mt="6px"
            as={colorMode === "light" ? IoMdMoon : IoMdSunny}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
      </Menu>

      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name={user?.username || "Usuario"}
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hola, {user?.username || "Usuario"}
            </Text>
          </Flex>
          <Link onClick={logout}>
            <Flex flexDirection="column" p="10px">
              <MenuItem borderRadius="8px" px="14px">
                <Text fontSize="sm">Cerrar sesión</Text>
              </MenuItem>
            </Flex>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavbarLinksAdmin;
