// TuComponente.js
import React from "react";
import "../../styles/cards.css"; // Asegúrate de que el nombre del archivo CSS coincide con el componente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Card = ({ image, title, description, url }) => {
  return (
    <section className="cards">
      <div className="cards_container">
        <div className="card">
          <div className="imgBx">
            <img src={image} alt="loki" />
          </div>
          <div className="content">
            <div className="contentBx">
              <h3>
                {title}
                <br />
                <span style={{ padding: "10px" }}>{description}</span>
              </h3>
            </div>
            <a className="cards_btn" href={url}>
              <FontAwesomeIcon icon={faLink} />
              Visitar Sitio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
