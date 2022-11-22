import { Navigate, Outlet } from "react-router-dom";
import React, { useState,useEffect } from "react";

const AlumnRoutes = (props) => {
  const { component: Component, isAuthenticated, ...rest} = props;
  const [isAuth, setIsAuth] = useState(false);
  const init = () => {
    if (localStorage.getItem("Auth").clave === "Alumno") {
      setIsAuth(true);
    }
  }
  useEffect(init, []);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AlumnRoutes;