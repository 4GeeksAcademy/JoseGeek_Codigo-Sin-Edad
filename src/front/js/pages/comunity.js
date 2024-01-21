import React from "react";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import Search from "../component/search";
import CardComunity from "../component/cardComunity";
import "../../styles/cardComunity.css";

const Comunity = () => {
  return (
    <>
      <Navbar />
      <Search />
      <div className="cardComunity_container_general">
        <CardComunity />
        <CardComunity />
        <CardComunity />
      </div>
      <Footer />
    </>
  );
};

export default Comunity;
