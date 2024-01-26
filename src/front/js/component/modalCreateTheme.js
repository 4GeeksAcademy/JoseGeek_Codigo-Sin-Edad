import React, { useContext } from "react";
import "../../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { useFormCreateTheme } from "../hooks/useFormCreateTheme";

const ModalTheme = ({ closeModal }) => {
  const { store, actions } = useContext(Context);

  const { description, title, onInputChange, onResetForm, update } =
    useFormCreateTheme(store, actions, closeModal);

  const handleCardClickSave = () => {
    closeModal();
    onResetForm();
    actions.temaEditFalse();
  };

  const handleCardClickUpdate = () => {
    update();
    closeModal();
    onResetForm();
    actions.temaEditFalse();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal_flex_title">
          <div></div>
          <FontAwesomeIcon
            className="modal_close"
            onClick={handleCardClickSave}
            icon={faXmark}
          />
        </div>
        <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Titulo
            </label>
            <input
              onChange={onInputChange}
              name="title"
              type="email"
              className="form-control"
              id="title"
              placeholder="Titulo del tema"
              value={title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              onChange={onInputChange}
              value={description}
              name="description"
              className="form-control"
              id="description"
              rows="3"
              placeholder="Descripción del tema"
            ></textarea>
          </div>
          <button
            onClick={
              store.temaEdit ? handleCardClickUpdate : handleCardClickSave
            }
            type="button"
            className="btn btn-success"
          >
            {store.temaEdit ? "Guardar tema" : "Crear tema"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalTheme;
