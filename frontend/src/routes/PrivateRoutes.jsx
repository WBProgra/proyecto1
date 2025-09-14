// importación de librerías y/o funciones
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { routes } from "./routes";
import AdminLayout from "../layouts/admin/AdminLayout";
import PageNotFound from "../pages/PageNotFound";

const PrivateRoutes = () => {
  const { user } = useAuth();
  console.log("TCL: PrivateRoutes -> user", user)
  const privateRoutes = routes.filter((route) => route.isPrivate);

  const hasAccess = (route) => {
    console.log("TCL: hasAccess -> route", route.accessValidate)
    // 1. El superusuario siempre tiene acceso a todo.
    if (user?.isSuperuser) {
      return true;
    }
    // 2. Si la ruta no requiere un rol específico, se permite el acceso.
    if (!route.accessValidate || route.accessValidate.length === 0) {
      return true;
    }
    // 3. Se comprueba si el rol del usuario está en la lista de roles permitidos.
    return route.accessValidate.includes(user?.rol?.nombre);
  };

  return (
    <AdminLayout>
      <Routes>
        {privateRoutes.map((route, index) =>
          hasAccess(route) ? (
            <Route
              key={index}
              path={route.path.substring(1)} // Quita el slash inicial para el anidamiento
              element={<route.component />}
            />
          ) : null
        )}
        {/* Ruta por defecto para usuarios logueados y manejo de 404 */}
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default PrivateRoutes;
