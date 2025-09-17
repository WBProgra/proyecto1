import React, { useContext } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";


// Suponiendo que tienes un contexto de autenticación
import { useAuth } from "../../../context/AuthContext";

const SidebarBrand = () => {
  const { user } = useAuth();

  // Ruta del logo del colegio
  const baseUrl = "http://localhost:8000/media/";
  const logoPath = "logos/placeholder.jpg";
  const logoUrl = `${baseUrl}${logoPath}`;
  return (
    <Flex align="center" direction="column">
      <Image
        src={logoUrl}
        alt="Logo Colegio"
        boxSize="100px"
        mb="20px"
        width={"100px"}
        height={"100px"}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
};

export default SidebarBrand;
