import React, { useContext } from "react";
import { Context } from "../store/appContext";
import NavBar from "../component/navBar.js";
import HeaderSection from "../component/headerSection.js";
import AboutMe from "../component/aboutMe.js";
import RecomdationMe from "../component/recomendationMe.js";
import RecomendationYou from "../component/recomendationYou.js";
import Invitation from "../component/invitation.js";
import ContactUs from "../component/contactUs.js";
import Footer from "../component/footer.js";

export const Home = () => {
  return (
    <>
      <NavBar />
      <HeaderSection />
      <Invitation />
      <RecomdationMe />
      <RecomendationYou />
      <AboutMe />
      <ContactUs />
      <Footer />
    </>
  );
};
