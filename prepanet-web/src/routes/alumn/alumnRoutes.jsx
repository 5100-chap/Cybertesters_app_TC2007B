import { Navigate, Outlet } from "react-router-dom";
import React, { useState,useEffect } from "react";

const AlumnRoutes = (props) => {
  var credential;
  const init = () => {
    credential = JSON.parse(localStorage.getItem("auth"))
  }
  try {
    init();
    console.log(credential);
    if (credential.clave === "Alumno") {
      return <Outlet />
    }
    else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/" />;
  }
};

export default AlumnRoutes;