// importación de librerías y/o funciones
import React from "react";
import { Route, Routes } from "react-router-dom";

// importación de pages
import LoginPage from "../pages/public/LoginScreen/LoginPage";

// importación de config
import PublicRouteConfig from "./config/PublicRouteConfig";
import { routes } from "./routes";

const PublicRoutes = () => {
  // obtiene las rutas públicas
  const publicRoutes = routes.filter((route) => !route.isPrivate);
  return (
    <>
      <Routes>
        <Route element={<PublicRouteConfig />}>
          {publicRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};

export default PublicRoutes;
