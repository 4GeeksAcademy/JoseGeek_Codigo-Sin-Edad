import React, { useContext, useRef } from "react";
import "../../styles/navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBars, FaTimes } from "react-icons/fa";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import logo from "../../../../public/img/logo.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Toaster, toast } from "sonner";

function Navbar() {
  const { store, actions } = useContext(Context);

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
            {store.dataUser ? (
              <>
                <Link
                  className="btn link btn_responsive_disabled"
                  to={store.dataUser ? "/" : "#recomendationMe"}
                >
                  Inicio
                </Link>
                <Link
                  href="#recomendationYou"
                  to={store.dataUser && "/comunity"}
                  className="btn link btn_responsive_disabled"
                >
                  Comunidad
                </Link>
                <Link
                  to={store.dataUser && "/"}
                  className="btn link btn_responsive_disabled"
                  href="#contactUs"
                >
                  Contácto
                </Link>
                <Link
                  className="btn link btn_responsive_disabled"
                  href="#aboutMe"
                >
                  Sobre mi
                </Link>
              </>
            ) : (
              <>
                <a
                  className="btn link btn_responsive_disabled"
                  href="#recomendationMe"
                >
                  Mis recomendaciones
                </a>
                <a
                  href="#recomendationYou"
                  className="btn link btn_responsive_disabled"
                >
                  Tus recomendaciones
                </a>
                <a
                  className="btn link btn_responsive_disabled"
                  href="#contactUs"
                >
                  Contácto
                </a>
                <a className="btn link btn_responsive_disabled" href="#aboutMe">
                  Sobre mi
                </a>
              </>
            )}
          </div>
          <nav ref={navRef}>
            <Link className="btn_responsive" to={"/"}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
            {store.dataUser ? (
              <>
                <Link
                  className="btn link btn_responsive"
                  to={store.dataUser && "/"}
                >
                  Inicio
                </Link>
                <Link
                  to={store.dataUser && "/"}
                  className="btn link btn_responsive"
                  href="#aboutMe"
                >
                  Sobre mi
                </Link>
                <Link
                  to={store.dataUser && "/comunity"}
                  className="btn link btn_responsive"
                >
                  Comunidad
                </Link>
              </>
            ) : (
              <a className="btn link btn_responsive" href="#aboutMe">
                Sobre mi
              </a>
            )}
            <Link className="btn link btn_responsive" href="#recomendationMe">
              Mis Recomendaciones
            </Link>
            <Link className="btn link btn_responsive" href="#contactUs">
              Contácto
            </Link>
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
                to={store.dataUser ? "/" : "/login"}
                className="btn btn-primary"
                onClick={store.dataUser ? () => actions.loguot() : null}
              >
                {store.dataUser ? "Cerrar Sesión" : "Iniciar Sesión"}
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
      <Toaster richColors />
    </>
  );
}

export default Navbar;
