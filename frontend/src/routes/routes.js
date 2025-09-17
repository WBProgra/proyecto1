// icons
import { MdHome, MdList } from "react-icons/md";

// pages
import LoginPage from "../pages/public/LoginScreen/LoginPage";
import ItemsPage from "../pages/private/Items/ItemsPage";
import ItemDetailPage from "../pages/private/Items/ItemDetailPage";

export const routes = [
  {
    name: "Dashboard", // Se dejará un dashboard de ejemplo
    icon: MdHome,
    path: "/dashboard",
    component: ItemsPage, // Usamos ItemsPage como página principal por ahora
    isPrivate: true,
    showSidebar: true,
    accessValidate: ["DEMO", "Editor", "Viewer"], // Se gestionará por roles genéricos
  },
  {
    name: "Items",
    icon: MdList,
    path: "/items",
    component: ItemsPage,
    isPrivate: true,
    showSidebar: true,
    accessValidate: ["DEMO", "Editor", "Viewer"],  // Se gestionará por roles genéricos
  },
  {
    name: "Detalle del Item",
    path: "/items/:itemId", // Ruta dinámica
    component: ItemDetailPage,
    isPrivate: true,
    showSidebar: false, // Importante: no la mostramos en el menú lateral
    accessValidate: ["DEMO", "Editor", "Viewer"],
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
