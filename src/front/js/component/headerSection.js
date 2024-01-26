import React from "react";
import { ReactTyped } from "react-typed";
import "../../styles/headerSection.css";
import hopPopImage from "../../../../public/img/hop_pop_1.png";
import { Button } from "./button";

const HeaderSection = () => {
  return (
    <div className="header_background">
      <section className="headerSection">
        <div className="headerSection_flex">
          <div className="headerSection_flex_size">
            <h1 className="headerSection_flex_size_title">
              <ReactTyped
                backSpeed={50}
                strings={["Jose Geek", "Código Sin Edad"]}
                typeSpeed={200}
                loop
              />
            </h1>
            <h2 className="headerSection_flex_size_subtitle">
              Nunca es tarde para empezar a programar
            </h2>
            <p className="headerSection_flex_size_paragraph">
              Hola! Soy Papa Hop y seré tu guía en esta web. No importa si eres
              joven o como yo te duelen las rodillas al estar todo el día
              sentado delante del ordenador, nunca es tarde para iniciarse en
              este apasionante mundo de la programación, donde nunca dejarás de
              aprender!
            </p>
            <Button text={"Registrarse"} enlace={"/login"} />
          </div>
          <img
            className="headerSection_flex_img"
            src={hopPopImage}
            alt="Hop Pop"
          />
        </div>
      </section>
      <div className="header_meme">
        <div className="custom-shape-divider-bottom-1704641617">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1199 119"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="bgSvg"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
