import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      100: "#E0F7FA", // Azul muy claro
      200: "#80DEEA", // Azul claro
      300: "#4DD0E1", // Azul intermedio
      400: "#26C6DA", // Azul vibrante
      500: "#00BCD4", // Azul principal
      600: "#00ACC1", // Azul oscuro
      700: "#00838F", // Azul muy oscuro
      800: "#006064", // Azul profundo
      900: "#004D40", // Azul verdoso profundo
    },
    brandScheme: {
      100: "#F1F8E9", // Verde muy claro
      200: "#C5E1A5", // Verde claro
      300: "#AED581", // Verde suave
      400: "#9CCC65", // Verde principal
      500: "#8BC34A", // Verde vibrante
      600: "#7CB342", // Verde oscuro
      700: "#689F38", // Verde oliva
      800: "#558B2F", // Verde bosque
      900: "#33691E", // Verde profundo
    },
    brandTabs: {
      100: "#ECEFF1", // Gris claro
      200: "#CFD8DC", // Gris intermedio
      300: "#B0BEC5", // Gris suave
      400: "#90A4AE", // Gris azulado
      500: "#78909C", // Gris vibrante
      600: "#607D8B", // Gris oscuro
      700: "#455A64", // Gris profundo
      800: "#37474F", // Gris muy oscuro
      900: "#263238", // Gris azulado profundo
    },
    secondaryGray: {
      100: "#F9FAFC", // Blanco suave
      200: "#F4F6F8", // Gris muy claro
      300: "#ECEFF1", // Gris claro
      400: "#CFD8DC", // Gris intermedio
      500: "#B0BEC5", // Gris azulado
      600: "#90A4AE", // Gris oscuro
      700: "#607D8B", // Gris muy oscuro
      800: "#455A64", // Gris profundo
      900: "#263238", // Gris azulado profundo
    },
    red: {
      100: "#FFEBEE", // Rojo claro
      500: "#E57373", // Rojo vibrante
      600: "#D32F2F", // Rojo oscuro
    },
    blue: {
      50: "#E3F2FD", // Azul claro
      500: "#2196F3", // Azul principal
    },
    orange: {
      100: "#FFF3E0", // Naranja claro
      500: "#FF9800", // Naranja vibrante
    },
    green: {
      100: "#E8F5E9", // Verde claro
      500: "#4CAF50", // Verde principal
    },
    navy: {
      50: "#E3F2FD", // Azul claro
      100: "#BBDEFB", // Azul suave
      200: "#90CAF9", // Azul intermedio
      300: "#64B5F6", // Azul vibrante
      400: "#42A5F5", // Azul principal
      500: "#2196F3", // Azul oscuro
      600: "#1E88E5", // Azul muy oscuro
      700: "#1565C0", // Azul profundo
      800: "#0D47A1", // Azul profundo intenso
      900: "#0B3D91", // Azul oscuro profundo
    },
    gray: {
      100: "#FAFAFA", // Blanco grisáceo
    },
    white: {
      100: "#FFFFFF", // Blanco puro
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.100", "navy.900")(props), // Fondo claro u oscuro según el modo
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      ".chakra-modal__content-container": {
        zIndex: "500 !important", // Ajusta el z-index del modal
      },
      ".chakra-modal__overlay": {
        zIndex: "50 !important", // Ajusta el z-index del modal
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
