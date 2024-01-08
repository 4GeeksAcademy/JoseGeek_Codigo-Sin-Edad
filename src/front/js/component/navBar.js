import React, { useRef } from "react";
import "../../styles/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header>
        <div className="container_div">
          <div className="links" ref={navRef}>
            <h3 className="logo">LOGO</h3>
            <a className="btn link btn_responsive_disabled" href="#">
              Sobre mi
            </a>
            <a className="btn link btn_responsive_disabled" href="#">
              Recomendaciones
            </a>
            <a className="btn link btn_responsive_disabled" href="#">
              Contácto
            </a>
          </div>
          <nav ref={navRef}>
            <h2 className="btn_responsive">LOGO</h2>
            <a className="btn link btn_responsive" href="#">
              Sobre mi
            </a>
            <a className="btn link btn_responsive" href="#">
              Recomendaciones
            </a>
            <a className="btn link btn_responsive" href="#">
              Contácto
            </a>
            <div className="btns">
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faGithub} />
              </button>
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faFacebookF} />
              </button>
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </button>
              <button
                className="nav-btn nav-close-btn btn_responsive"
                onClick={showNavbar}
              >
                <FaTimes />
              </button>
            </div>
          </nav>
          <button className="nav-btn btn_responsive" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
