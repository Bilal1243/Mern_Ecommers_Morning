import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const { userData } = useSelector((state) => state.auth);

  return <>{userData ? <Outlet /> : <Navigate to={"/login"} replace />}</>;
}

export default PrivateRoutes;