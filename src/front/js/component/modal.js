import React from "react";
import "../../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal_flex_title">
          {children}
          <FontAwesomeIcon
            className="modal_close"
            onClick={closeModal}
            icon={faXmark}
          />
        </div>
        <p className="modal_paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          mollitia non aut at ad fuga beatae suscipit eum quos dolore, autem
          ducimus! Quia, culpa. Repellat modi ipsa voluptate est facere!
        </p>
        <div className="modal_flex">
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresar un comentario"
          />
          <button type="button" class="btn btn-success">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
