// importación de librerías y/o funciones
import React from "react";
import { Route, Routes } from "react-router-dom";

// importación de pages
import PrivateRouteConfig from "./config/PrivateRouteConfig";
import { routes } from "./routes";
import AdminLayout from "../layouts/admin/AdminLayout";

const PrivateRoutes = () => {
  // obtiene las rutas privadas
  const privateRoutes = routes.filter((route) => route.isPrivate);
  return (
    <>
      <Routes>
        {privateRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              element={
                <PrivateRouteConfig accessValidate={route.accessValidate} />
              }
            >
              <Route
                path={route.path}
                element={
                  <AdminLayout navName={route.name}>
                    <route.component />
                  </AdminLayout>
                }
              />
            </Route>
          );
        })}
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
