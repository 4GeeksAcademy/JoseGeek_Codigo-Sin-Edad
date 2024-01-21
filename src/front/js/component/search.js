import React, { useState } from "react";
import "../../styles/search.css";
import ModalTheme from "./modalCreateTheme";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && <ModalTheme closeModal={closeModal} />}
      <div className="search">
        <h2 className="search_title">Comunidad</h2>
        <p className="search_paragraph">
          Compartir con la comunidad es una parte fundamental de tu crecimiento
          en el mundo del desarrollo. Al crear un tema y comentar con la
          comunidad, estás contribuyendo al intercambio de conocimientos y
          fomentando un ambiente de aprendizaje colaborativo. Compartir tus
          experiencias y consejos que te han ayudado en tu propio camino de
          aprendizaje puede ser una valiosa fuente de inspiración para otros.
        </p>

        <form className="search_flex" role="search">
          <input
            className="form-control me-2 search_flex_input bgSvg"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </form>
        <button
          onClick={handleCardClick}
          className="btn btn-outline-success search_flex_button"
        >
          Ingresar nuevo tema
        </button>
      </div>
    </>
  );
};

export default Search;
