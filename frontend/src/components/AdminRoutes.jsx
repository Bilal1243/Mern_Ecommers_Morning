import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const { userData } = useSelector((state) => state.auth);

  return (
    <>
      {userData && userData.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
}

export default AdminRoutes;
