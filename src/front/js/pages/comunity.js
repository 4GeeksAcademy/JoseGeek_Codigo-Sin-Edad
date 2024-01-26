import React, { useContext, useEffect } from "react";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import Search from "../component/search";
import CardComunity from "../component/cardComunity";
import "../../styles/cardComunity.css";
import { Context } from "../store/appContext";

const Comunity = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.temasList();
  }, []);

  return (
    <>
      <Navbar />
      <Search />
      <div className="cardComunity_container_general">
        {!store.filterTema ? (
          store.temas ? (
            store.temas.map((tema) => (
              <CardComunity
                titulo={tema.titulo}
                description={tema.contenido}
                fecha={tema.fecha_creacion}
                usuario={tema.nombre_usuario}
                id={tema.id}
                usuarioId={tema.usuario_id}
                key={tema.id}
              />
            ))
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )
        ) : (
          store.filterTema.map((tema) => (
            <CardComunity
              titulo={tema.titulo}
              description={tema.contenido}
              fecha={tema.fecha_creacion}
              usuario={tema.nombre_usuario}
              id={tema.id}
              usuarioId={tema.usuario_id}
              key={tema.id}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Comunity;
