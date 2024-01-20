import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";
import { Home } from "./pages/home";
import LoginHome from "./pages/login";
import Register from "./pages/register";
import Comunity from "./pages/comunity";
import ProtectedRoute from "./component/protectedRoute";

const Layout = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("user");
    const usuario = datosGuardados ? JSON.parse(datosGuardados) : null;

    if (usuario) {
      actions.dataUserUpdate(usuario);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<LoginHome />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route
            element={
              <ProtectedRoute>
                <Comunity />
              </ProtectedRoute>
            }
            path="/comunity"
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
