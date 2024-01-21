import React from "react";
import { useFormHook } from "./useFormHook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useFormCreateTheme = (store, actions, closeModal) => {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const registerValidations = (formState) => {
    const errors = {};
    if (!formState.title) {
      errors.title = "El titulo es requerido";
    }
    if (!formState.description) {
      errors.description = "La descripción es requerida";
    }
    if (formState.title.length < 6) {
      errors.title = "El titulo debe tener mas de 6 caracteres";
    }
    if (formState.description.length < 9) {
      errors.description = "La descripcion debe tener mas de 9 caracteres";
    }
    return errors;
  };

  const { formState, errors, onInputChange, onResetForm } = useFormHook(
    { title: "", description: "" },
    registerValidations
  );

  const { title, description } = formState;

  const validBackendCreateTheme = async () => {
    fetch(process.env.REACT_APP_CREATE_TEMA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: title,
        contenido: description,
        usuario_id: store.dataUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "Tema creado satisfactoriamente") {
          toast.success("Tema creado satisfactoriamente");
          closeModal();
          onResetForm();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitCreateTheme = () => {
    const formErrors = registerValidations(formState);
    if (Object.keys(formErrors).length > 0) {
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    validBackendCreateTheme();
  };

  return {
    onInputChange,
    errors,
    title,
    description,
    formState,
    handleSubmitCreateTheme,
    onResetForm,
  };
};
