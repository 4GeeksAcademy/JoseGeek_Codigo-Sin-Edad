import React, { useContext, useEffect, useState } from "react";
import "../../styles/search.css";
import ModalTheme from "./modalCreateTheme";
import { Context } from "../store/appContext";
import _ from "lodash";

const Search = () => {
  const { store, actions } = useContext(Context);

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchInput === "") {
      actions.modificatedFilterTema(false);
    }
    filter();
  }, [searchInput]);

  const filter = () => {
    let tem = store.temas;
    if (Array.isArray(tem)) {
      let filtrados = tem.filter((te) =>
        te.titulo.toLowerCase().includes(searchInput.toLowerCase())
      );
      actions.modificatedFilterTema(filtrados);
    }
  };

  return (
    <>
      {store.modalEdit && <ModalTheme closeModal={actions.modalFalse} />}
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
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Buscar temas..."
          />
        </form>
        <button
          onClick={actions.modalTrue}
          className="btn btn-outline-success search_flex_button"
        >
          Ingresar nuevo tema
        </button>
      </div>
    </>
  );
};

export default Search;
