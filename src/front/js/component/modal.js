import React from "react";
import "../../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ closeModal, children, description }) => {
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
        <p className="modal_paragraph">{description}</p>
        <div
          style={{
            border: ".2rem solid #29335c",
            width: "100%",
            marginBottom: "1rem",
          }}
        />
        <button
          className="btn btn-outline-danger"
          style={{ width: "3rem", marginBottom: "1rem" }}
        >
          <FontAwesomeIcon style={{ fontSize: "1.2rem" }} icon={faHeart} />
        </button>
        <p
          className="cardComunity_paragraph"
          style={{ color: "black", fontSize: "0.8rem" }}
        >
          <span className="cardComunity_paragraph_author">Erik Acosta</span>
          Publicado hace 22 h
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
          dignissimos aliquam repellat minus, incidunt possimus aspernatur unde
          provident labore odio ratione sint accusantium dolorem eum laudantium
          consequuntur laborum qui explicabo!
        </p>
        <div
          style={{
            border: ".05rem solid #29335c",
            width: "100%",
            marginBottom: "1rem",
          }}
        />
        <form className="modal_flex" action="">
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
        </form>
      </div>
    </div>
  );
};

export default Modal;
