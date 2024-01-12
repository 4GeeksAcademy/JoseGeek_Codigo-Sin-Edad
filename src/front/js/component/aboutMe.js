import React from "react";
import "../../styles/aboutMe.css";
import fotoAbout from "../../../../public/img/aboutme.jpg";
import backgroundImage from "../../../../public/img/aboutmeBackground.jpg";

const AboutMe = () => {
  const style = {
    backgroundImage: `url(${backgroundImage})`,
    // otros estilos...
  };

  return (
    <section className="aboutMe_background" style={style}>
      <div className="aboutMe_container_glasess">
        <div className="aboutMe_container glasses">
          <div className="aboutMe">
            <h2 className="aboutMe_title">Acerca de Mí</h2>
            <div className="aboutMe_title_flex">
              <p className="aboutMe_title_flex_paragraph">
                ¡Hola!, soy Jose, aunque también me puedas llamar JoseGeek.
                Empecé un poco tarde a aprender a programar, ya con 44 años,
                pero descubrí algo que me apasiona y que me ha llevado a querer
                aprender cada día más. Esta web es para ayudarte en tu viaje
                como programador y para que tú también colabores con consejos y
                recomendaciones.
              </p>
              <img
                className="aboutMe_title_flex_image"
                src={fotoAbout}
                alt="About me"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
