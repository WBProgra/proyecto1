import React from "react";
// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import SidebarBrand from "./SidebarBrand";
import SidebarLinks from "./Links";

// FUNCTIONS

const SidebarContent = () => {
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <SidebarBrand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <SidebarLinks />
        </Box>
      </Stack>

      <Box mt="60px" mb="40px" borderRadius="30px"></Box>
    </Flex>
  );
};

export default SidebarContent;
