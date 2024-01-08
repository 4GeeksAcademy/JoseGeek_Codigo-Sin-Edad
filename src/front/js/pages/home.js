import React, { useContext } from "react";
import { Context } from "../store/appContext";
import NavBar from "../component/navBar.js";
import HeaderSection from "../component/headerSection.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <NavBar />
      <HeaderSection />
    </>
  );
};
