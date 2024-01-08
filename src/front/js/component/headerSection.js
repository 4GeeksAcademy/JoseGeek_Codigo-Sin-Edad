import React from "react";
import ReactTyped from "react-typed";
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
                strings={["Jose Geek", "Developer"]}
                typeSpeed={200}
                loop
              />
            </h1>
            <h2 className="headerSection_flex_size_subtitle">
              Desarrollador full stack
            </h2>
            <p className="headerSection_flex_size_paragraph">
              Empecé mi emocionante travesía en el desarrollo tarde, pero cada
              línea de código es un testimonio de mi dedicación. Desafiando
              convenciones, he transformado desafíos en oportunidades,
              demostrando que nunca es tarde para abrazar el fascinante mundo
              del desarrollo.
            </p>
            <Button text={"Contáctame"} color={"#db2b39"} />
          </div>
          <img
            className="headerSection_flex_img"
            src={hopPopImage}
            alt="Hop Pop"
          />
        </div>
      </section>
      <div className="header_meme">
        <p className="header_meme_paragraph_top">Hola Soy Jose Geek</p>
        <p className="header_meme_paragraph_bottom">
          Empece tarde en la programación
        </p>
        <div class="custom-shape-divider-bottom-1704641617">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;