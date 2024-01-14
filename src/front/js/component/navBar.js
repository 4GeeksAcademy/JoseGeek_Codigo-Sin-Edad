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
            <a
              // onClick={() => redirigirASeccion("recomendationMe")}
              className="btn link btn_responsive_disabled"
              href="#recomendationMe"
            >
              Mis recomendaciones
            </a>
            <a
              className="btn link btn_responsive_disabled"
              href="#recomendationYou"
            >
              Tus recomendaciones
            </a>
            <a className="btn link btn_responsive_disabled" href="#contactUs">
              Contácto
            </a>
            <a className="btn link btn_responsive_disabled" href="#aboutMe">
              Sobre mi
            </a>
          </div>
          <nav ref={navRef}>
            <Link className="btn_responsive" to={"/"}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
            <a className="btn link btn_responsive" href="#aboutMe">
              Sobre mi
            </a>
            <a className="btn link btn_responsive" href="#recomendationYou">
              Tus recomendaciones
            </a>
            <a className="btn link btn_responsive" href="#recomendationMe">
              Mis Recomendaciones
            </a>
            <a className="btn link btn_responsive" href="#contactUs">
              Contácto
            </a>
            <div className="btns">
              <Link
                style={{ margin: "0" }}
                to={"https://github.com/JoseGeek78"}
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
                to={"/login"}
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
