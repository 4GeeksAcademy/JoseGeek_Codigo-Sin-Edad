import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRouteLogin = ({ children }) => {
  const { store } = useContext(Context);

  if (store.dataUser) {
    // Redirigir al usuario si dataUser está vacío
    return <Navigate to="/" />;
  }

  return children; // Renderizar el componente protegido si dataUser tiene datos
};

export default ProtectedRouteLogin;
