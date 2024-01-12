import React, { useState } from "react";
import "../../styles/cardComunity.css";
import { Link } from "react-router-dom";
import Modal from "./modal";

const CardComunity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <p className="cardComunity_modal">Titulo</p>
        </Modal>
      )}
      <Link onClick={handleCardClick} className="cardComunity" to={"#"}>
        <p className="cardComunity_paragraph">
          <span className="cardComunity_paragraph_author">Erik Acosta</span>
          Publicado hace 22 h
        </p>
        <h3 className="cardComunity_title">React o Flutter</h3>
        <div className="cardComunity_descriptionTheme">
          <p className="cardComunity_descriptionTheme_paragraph">
            Explora un universo de oportunidades y experiencias inolvidables que
            te esperan a la vuelta de la esquina. Desde aventuras emocionantes
            hasta momentos de relajación y reflexión, nuestro destino te brinda
            la oportunidad de vivir la vida al máximo. Únete a nosotros en un
            viaje inolvidable donde cada día es una nueva aventura y cada rincón
            es una historia por descubrir. Bienvenido a un mundo de
            posibilidades infinitas.
          </p>
        </div>
      </Link>
    </>
  );
};

export default CardComunity;
