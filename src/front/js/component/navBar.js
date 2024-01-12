import React, { useRef } from "react";
import "../../styles/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBars, FaTimes } from "react-icons/fa";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import logo from "../../../../public/img/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header className="header">
        <div className="container_div">
          <div className="links" ref={navRef}>
            <Link to={"/"}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
            <a className="btn link btn_responsive_disabled" href="#">
              Mis recomendaciones
            </a>
            <a className="btn link btn_responsive_disabled" href="#">
              Tus recomendaciones
            </a>
            <a className="btn link btn_responsive_disabled" href="#">
              Contácto
            </a>
            <a className="btn link btn_responsive_disabled" href="#">
              Sobre mi
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
              <Link
                style={{ margin: "0" }}
                to={"#"}
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
              <Link
                style={{ margin: "0" }}
                to={"#"}
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
              <Link
                style={{ margin: "0" }}
                to={"#"}
                className="btn btn-primary"
              >
                Iniciar Sesión
              </Link>
              <Link
                style={{ width: "3rem" }}
                className="nav-btn nav-close-btn btn_responsive"
                onClick={showNavbar}
                to={"#"}
              >
                <FaTimes />
              </Link>
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
