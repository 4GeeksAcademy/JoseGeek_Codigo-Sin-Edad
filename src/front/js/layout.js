import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext";
import { Toaster, toast } from "sonner";
import { Home } from "./pages/home";
import LoginHome from "./pages/login";
import Register from "./pages/register";
import Comunity from "./pages/comunity";
import ProtectedRoute from "./component/protectedRoute";
import ProtectedRouteLogin from "./component/protectedRouteLogin";

const Layout = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("user");
    const usuario = datosGuardados ? JSON.parse(datosGuardados) : null;

    if (usuario) {
      actions.dataUserUpdate(usuario);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={
              <ProtectedRouteLogin>
                <LoginHome />
              </ProtectedRouteLogin>
            }
            path="/login"
          />
          <Route
            element={
              <ProtectedRouteLogin>
                <Register />
              </ProtectedRouteLogin>
            }
            path="/register"
          />
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
      <Toaster richColors />
    </div>
  );
};

export default injectContext(Layout);
