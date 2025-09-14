import React from "react";


// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import AuthIllustration from "../../../layouts/auth/Default";
import Title from "../../../components/texts/Title";

// Assets
import illustration from "../../../assets/img/auth/auth2.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import SubTitle from "../../../components/texts/SubTitle";

// Context
import { useAuth } from "../../../context/AuthContext";

// React router dom
import { useNavigate } from "react-router-dom";

// React hook form
import { useForm } from "react-hook-form";

// Services
import { loginService } from "../../../services/UserServices";

// React hot toast
import toast from "react-hot-toast";

const LoginPage = () => {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // --------------------------------- EXTRA ------------------------------------
  const { setUser, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginService(data)
      .then((response) => {
        toast.success(response.detail);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("authTokens", JSON.stringify(response.token));
        navigate("/");
      })
      .catch((err) => {
        console.log("🚀 ~ onSubmit ~ err:", err);
        const errorMessage = err?.data?.detail || "Error en el inicio de sesión.";
        toast.error(errorMessage);
      });
  };

  return (
    <AuthIllustration
      illustrationBackground={illustration}
      image={illustration}
    >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        px={{ base: "25px", md: "0px" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Title content="¡Bienvenido de nuevo!" textColor={textColor} />
          <SubTitle
            textColor={textColorSecondary}
            content="Inicia sesión para continuar"
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
          >
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Usuario<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Ingrese su usuario"
                mb="24px"
                fontWeight="500"
                size="lg"
                {...register("username", { required: true })}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
                name="password"
              >
                Contraseña<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Ingrese su contraseña"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  {...register("password", { required: true })}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                {/* <NavLink to="#your-link"> */}
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  fontWeight="500"
                  cursor="pointer"
                >
                  ¿Olvidaste tu contraseña?
                </Text>
                {/* </NavLink> */}
              </Flex>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                type="submit"
              >
                Iniciar sesión
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                ¿Todavía no estás registrado?
                {/* <NavLink to="your-link"> */}
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                  cursor="pointer"
                >
                  Regístrate aquí
                </Text>
                {/* </NavLink> */}
              </Text>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </AuthIllustration>
  );
};

export default LoginPage;
