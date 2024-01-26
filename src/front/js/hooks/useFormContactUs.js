import React from "react";
import { useFormHook } from "./useFormHook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const useFormContactUs = (store, actions) => {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const registerValidations = (formState) => {
    const errors = {};
    if (!formState.nombre) {
      errors.nombre = "El nombre es requerido";
    } else if (!emailRegex.test(formState.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!formState.email) {
      errors.email = "El correo es requerido";
    }
    if (!formState.telefono) {
      errors.edad = "El telefono es requerido";
    }
    if (!formState.mensaje) {
      errors.mensaje = "El mensaje es requerido";
    }
    return errors;
  };

  const { formState, errors, onInputChange, onResetForm } = useFormHook(
    { nombre: "", email: "", telefono: 0, mensaje: "" },
    registerValidations
  );

  const { nombre, email, telefono, mensaje } = formState;

  const validBackendRegister = async (data) => {
    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        data,
        process.env.REACT_APP_EMAIL_USER_ID
      )
      .then(
        function (response) {
          toast.success("Informacion enviada satisfactoriamente");
        },
        function (error) {
          toast.error("Ocurrio un error al enviar la informacion");
          console.log("FAILED...", error);
        }
      );
  };

  const handleSubmitContact = () => {
    const formErrors = registerValidations(formState);
    if (Object.keys(formErrors).length > 0) {
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    const data = {
      name: nombre,
      email: email,
      telefono: telefono,
      mensaje: mensaje,
    };
    validBackendRegister(data);
    onResetForm();
  };

  return {
    onInputChange,
    errors,
    nombre,
    email,
    telefono,
    mensaje,
    formState,
    handleSubmitContact,
    onResetForm,
  };
};
