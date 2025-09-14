// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

// Layout components
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState } from "react";

// Custom Chakra theme
const AdminLayout = ({ children, navName = "Bienvenido" }) => {
  // states and functions
  const [fixed] = useState(false);
  const bgColor = useColorModeValue("secondaryGray.400", "navy.900");

  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <Box>
        <Sidebar display="none" />
        <Box
          bg={bgColor}
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <NavbarAdmin
                onOpen={onOpen}
                brandText={navName}
                secondary={false}
                fixed={fixed}
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
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
