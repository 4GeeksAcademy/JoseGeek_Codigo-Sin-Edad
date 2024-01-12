import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import { Home } from "./pages/home";
import LoginHome from "./pages/login";
import Register from "./pages/register";
import Comunity from "./pages/comunity";

//create your first component
const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<LoginHome />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Comunity />} path="/comunity" />
          <Route path="*" element={<h1> Not found! </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
