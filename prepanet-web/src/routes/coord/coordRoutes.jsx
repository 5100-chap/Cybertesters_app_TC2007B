import { Navigate, Outlet } from "react-router-dom";
import React from "react";


const CoordRoutes = (props) => {
  var credential;

  const init = () => {
    credential = JSON.parse(localStorage.getItem("auth"));
  }
  try {
    init();
    if (credential.clave === "Coordinador") {
      return <Outlet />;
    }
    else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/" />;
  }
};

export default CoordRoutes;