import React from "react";
import "../../styles/contacUs.css";
import papaHop from "../../../../public/img/hop_pop_2.png";
import { Link } from "react-router-dom";
import { useFormContactUs } from "../hooks/useFormContactUs";

const ContactUs = () => {
  const {
    onInputChange,
    onResetForm,
    telefono,
    email,
    mensaje,
    nombre,
    handleSubmitContact,
  } = useFormContactUs();

  return (
    <div className="contactUs_cuerpo">
      <form id="contactUs" action="" className="contactUs_formulario">
        <h1 className="contactUs_titulo">Contactar</h1>
        <div className="contactUs_grupo">
          <input
            className="contactUs_entrada"
            type="text"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
          />
          <span className="contactUs_barra"></span>
          <label className="contactUs_etiqueta">Nombre</label>
        </div>
        <div className="contactUs_grupo">
          <input
            className="contactUs_entrada"
            type="email"
            value={email}
            name="email"
            onChange={onInputChange}
            required
          />
          <span className="contactUs_barra"></span>
          <label className="contactUs_etiqueta">Email</label>
        </div>
        <div className="contactUs_grupo">
          <input
            className="contactUs_entrada"
            type="number"
            name="telefono"
            value={telefono}
            onChange={onInputChange}
            required
          />
          <span className="contactUs_barra"></span>
          <label className="contactUs_etiqueta">Telefono</label>
        </div>
        <div className="contactUs_grupo">
          <textarea
            className="contactUs_area"
            name="mensaje"
            value={mensaje}
            onChange={onInputChange}
            rows="3"
            required
          ></textarea>
          <span className="contactUs_barra"></span>
          <label className="contactUs_etiqueta">Mensaje</label>
        </div>
        <Link
          onClick={handleSubmitContact}
          className="btn btn-success contactUs_boton"
        >
          Enviar
        </Link>
      </form>
      <div className="contactUs_imagen_flex">
        <img src={papaHop} alt="Papa hop" className="contactUs_imagen" />
        <h5>
          Si quieres contactar conmigo ¡Daré saltos de alegria al recibir tu
          mensaje!
        </h5>
      </div>
    </div>
  );
};

export default ContactUs;
