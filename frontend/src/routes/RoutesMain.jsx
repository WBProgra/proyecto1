import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const RoutesMain = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<PublicRoutes />} />

      {/* Private routes */}
      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
  );
};

export default RoutesMain;