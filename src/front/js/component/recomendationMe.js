import React from "react";
import "../../styles/recomendationMe.css";
import Card from "./card";
import card_1 from "../../../../public/img/card_1.png";
import card_2 from "../../../../public/img/card_2.png";
import card_3 from "../../../../public/img/card_3.png";

const RecomendationMe = () => {
  return (
    <section className="recomendationMe">
      <div className="curved-div upper bgSvgDiv">
        <svg viewBox="0 0 1440 319">
          <path
            fill="#005F71"
            fill-opacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="curved-div">
        <div className="recomendationMe_paragraph_container">
          <h3 id="recomendationMe" className="recomendationMe_title">
            Mis Recomendaciones
          </h3>
        </div>
        <div className="recomendationMe_paragraph_container">
          <p className="recomendationMe_paragraph_container_description">
            Iniciar en el mundo de la programación es embarcarse en un viaje
            apasionante de resolución de problemas y creatividad. Mi
            recomendación principal sería abrazar la mentalidad de aprendizaje
            continuo, ya que la tecnología evoluciona constantemente. Dedica
            tiempo a proyectos prácticos, colabora con la comunidad, y domina
            los fundamentos antes de aventurarte en áreas más avanzadas. Mantén
            tu código limpio y documentado para facilitar la colaboración y el
            mantenimiento a largo plazo. Recuerda que la programación es más que
            solo escribir código; es una habilidad que se cultiva con la
            práctica, la paciencia y la disposición para enfrentar desafíos.
            ¡Disfruta del proceso y celebra cada logro en tu camino hacia el
            dominio de esta fascinante disciplina! Estos son sitios excelentes
            para empezar de forma clara y estructurada
          </p>
        </div>
        <div className="recomendationMe_flex_cards">
          <Card
            image={card_1}
            title={"4Geeks Academy"}
            description={"Aprende desarrollo web y programación."}
            url={"https://4geeksacademy.com/es/inicio"}
          />
          <Card
            image={card_2}
            title={"freeCodeCamp"}
            description={"Plataforma gratuita para aprender a codificar."}
            url={"https://www.freecodecamp.org/"}
          />
          <Card
            image={card_3}
            title={"Codecademy"}
            description={
              " Tu destino para aprender a codificar de manera interactiva y efectiva."
            }
            url={"https://www.codecademy.com/"}
          />
        </div>
        <h5 style={{ textAlign: "center" }}>
          Proximamente mas recomendaciones...
        </h5>
        <svg viewBox="0 0 1440 319">
          <path
            fill="rgb(245, 245, 230)"
            fill-opacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default RecomendationMe;
