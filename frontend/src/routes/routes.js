// icons
import { MdHome, MdList } from "react-icons/md";

// pages
import LoginPage from "../pages/public/LoginScreen/LoginPage";
import ItemsPage from "../pages/private/ItemsPage";

export const routes = [
  {
    name: "Dashboard", // Se dejará un dashboard de ejemplo
    icon: MdHome,
    path: "/",
    component: ItemsPage, // Usamos ItemsPage como página principal por ahora
    isPrivate: true,
    showSidebar: true,
    accessValidate: ["Admin", "Editor", "Viewer"], // Se gestionará por roles genéricos
  },
  {
    name: "Items",
    icon: MdList,
    path: "/items",
    component: ItemsPage,
    isPrivate: true,
    showSidebar: true,
    accessValidate: ["Admin", "Editor", "Viewer"], // Se gestionará por roles genéricos
  },
  {
    // Ruta de login pública
    path: "/login",
    component: LoginPage,
    isPrivate: false,
    showSidebar: false,
    accessValidate: false,
  },
];
