import { Navigate, Outlet } from "react-router-dom";
import React, { useState,useEffect } from "react";

const AlumnRoutes = (props) => {
  const { component: Component, isAuthenticated, ...rest} = props;
  const [isAuth, setIsAuth] = useState(true);
  const init = () => {
    let credential = JSON.parse(localStorage.getItem("auth"))
    if (!(credential.clave === "Alumno")){
      setIsAuth(false);
      return <Navigate to="/" />;
    }
  }
  useEffect(init, []);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AlumnRoutes;