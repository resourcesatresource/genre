import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useCookies } from "react-cookie";

const ProtectedRoutes = () => {
  const [userContext, _] = useCookies();

  const isAuthenticated = !!userContext.token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
