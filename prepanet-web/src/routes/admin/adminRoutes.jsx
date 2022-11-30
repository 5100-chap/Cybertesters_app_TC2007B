import { Navigate, Outlet } from "react-router-dom";
import React from "react";


const AdminRoutes = (props) => {
  var credential;
  const init = () => {
    credential = JSON.parse(localStorage.getItem("auth"));
  }
  try {
    init();
    if (credential.clave === "Administrador") {
      return <Outlet />;
    }
    else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/" />;
  }
};

export default AdminRoutes;