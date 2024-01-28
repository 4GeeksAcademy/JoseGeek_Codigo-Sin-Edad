import React, { useContext, useEffect, useState } from "react";
import "../../styles/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Context } from "../store/appContext";

const Modal = ({ closeModal, children, description, temaId, usuarioId }) => {
  const [comentario, setComentario] = useState("");
  const { store, actions } = useContext(Context);

  const handleChange = (e) => {
    setComentario(e.target.value);
  };

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

  useEffect(() => {
    if (store.comentsEdit) {
      setComentario(store.comentsEdit.contenido);
    }
  }, [store.comentsEdit]);

  const cargarComentarios = store.comentsAll.filter(
    (coment) => coment.tema_id === temaId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comentario === "") {
      return toast.error("El comentario no puede estar vacío");
    }
    // Aquí puedes hacer una solicitud a tu servidor backend para enviar el correo
    await fetch(`${process.env.REACT_APP_ADD_COMMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenido: comentario,
        tema_id: temaId,
        usuario_id: store.dataUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        toast.success("Comentario creado satisfactoriamente");
        setComentario("");
        actions.comentsAlls();
      })
      .catch((err) => console.log(err));
  };

  const editCamp = (coment) => {
    actions.comentEdit(coment);
    actions.temasList();
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    if (comentario === "") {
      toast.error("El comentario no puede estar vacío");
    }
    // Aquí puedes hacer una solicitud a tu servidor backend para enviar el correo
    await fetch(
      `${process.env.REACT_APP_UPDATE_COMENTS}${store.comentsEdit.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenido: comentario,
          usuario_id: usuarioId,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        toast.success("Comentario actualizado satisfactoriamente");
        actions.comentsAlls();
        setComentario("");
        actions.resetComentEdit();
      })
      .catch((err) => console.log(err));
  };

  const deleteComent = async (item) => {
    // Aquí puedes hacer una solicitud a tu servidor backend para enviar el correo
    await fetch(`${process.env.REACT_APP_DELETE_COMENTS}${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioId,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        toast.success("Comentario eliminado satisfactoriamente");
        actions.comentsAlls();
        setComentario("");
        actions.resetComentEdit();
      })
      .catch((err) => console.log(err));
  };

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
        {cargarComentarios ? (
          cargarComentarios.map((item) => {
            let permitdEditComent = store.dataUser.id === item.usuario_id;
            return (
              <div key={item.id}>
                <p
                  className="cardComunity_paragraph"
                  style={{ color: "black", fontSize: "0.8rem" }}
                >
                  <span className="cardComunity_paragraph_author">
                    {item.usuario}
                  </span>
                  {formatearFechaPublicacion(item.fecha_creacion)}
                </p>
                <p style={{ marginBottom: "0" }}>{item.contenido}</p>
                {(permitdEditComent || store.dataUser.es_admin) && (
                  <div
                    style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
                  >
                    <button
                      onClick={() => editCamp(item)}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteComent(item)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <div
          style={{
            border: ".05rem solid #29335c",
            width: "100%",
            marginBottom: "1rem",
          }}
        />
        <form className="modal_flex" action="">
          <input
            value={comentario}
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresar un comentario"
            name={comentario}
            onChange={handleChange}
          />
          <button
            onClick={store.comentsEdit ? updateSubmit : handleSubmit}
            type="button"
            className="btn btn-success"
          >
            {store.comentsEdit ? "Actualizar" : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
