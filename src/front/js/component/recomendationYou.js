import React from "react";
import { Link } from "react-router-dom";
import "../../styles/recomendationYou.css";

const RecomendationYou = () => {
  return (
    <section className="recomendationYou">
      <h3 id="recomendationYou" className="recomendationYou_title">
        Únete a la comunidad y haz tu aporte o recomendación
      </h3>
      <p className="recomendationYou_paragraph">
        La colaboración va más allá de las líneas de código. Este espacio está
        diseñado para que compartas no solo tus conocimientos, sino también tus
        experiencias personales en el mundo de la programación. Anímate a ser
        parte activa de nuestra comunidad al hablar de los desafíos que has
        superado, los momentos de inspiración que has encontrado y las
        soluciones ingeniosas que has desarrollado. Este es tu espacio para
        compartir recomendaciones valiosas, herramientas esenciales y cualquier
        recurso que haya sido un aliado en tu viaje de aprendizaje y práctica.
        Ya seas un novato entusiasta o un programador experimentado, todos
        tienen algo valioso que aportar.
      </p>
      <div style={{ marginTop: "1rem" }} className="div_button">
        <Link to={"/login"} className="recomendationYou_button">
          Registrarme
        </Link>
      </div>
    </section>
  );
};

export default RecomendationYou;
