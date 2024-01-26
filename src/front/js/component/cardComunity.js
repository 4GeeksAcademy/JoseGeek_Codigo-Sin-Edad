import React, { useContext, useState } from "react";
import "../../styles/cardComunity.css";
import { Link } from "react-router-dom";
import Modal from "./modal";
import { Context } from "../store/appContext";

const CardComunity = ({
  titulo,
  description,
  fecha,
  usuario,
  usuarioId,
  id,
}) => {
  const { store, actions } = useContext(Context);

  const permitidEdit = store.dataUser.id === usuarioId;

  function formatearFechaPublicacion(fecha) {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();

    const diferenciaHoras = Math.floor(
      (fechaActual - fechaPublicacion) / (1000 * 60 * 60)
    );

    if (diferenciaHoras < 1) {
      return "Publicado hace menos de 1 hora";
    } else if (diferenciaHoras === 1) {
      return "Publicado hace 1 hora";
    } else {
      return `Publicado hace ${diferenciaHoras} horas`;
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const enviarInfoEditar = () => {
    actions.temaEdit({ id, titulo, description, fecha, usuario, usuarioId });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <Modal closeModal={closeModal} description={description}>
          <p className="cardComunity_modal">
            {titulo}
            <span className="cardComunity_modal_title">
              {formatearFechaPublicacion(fecha)}
            </span>
          </p>
        </Modal>
      )}
      <div>
        <Link onClick={handleCardClick} className="cardComunity" to={"#"}>
          <p className="cardComunity_paragraph">
            <span className="cardComunity_paragraph_author">{usuario}</span>
            {formatearFechaPublicacion(fecha)}
          </p>
          <h3 className="cardComunity_title">{titulo}</h3>
          <div className="cardComunity_descriptionTheme">
            <p className="cardComunity_descriptionTheme_paragraph">
              {description}
            </p>
          </div>
        </Link>
        {permitidEdit && (
          <div className="buttonsFlex">
            <button
              onClick={enviarInfoEditar}
              type="button"
              className="btn btn-outline-primary"
            >
              Editar
            </button>
            <button
              onClick={() => actions.deleteTema(id, store.dataUser.id)}
              type="button"
              className="btn btn-outline-danger"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CardComunity;
