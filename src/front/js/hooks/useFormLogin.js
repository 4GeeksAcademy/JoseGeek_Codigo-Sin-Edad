import React from "react";
import { useFormHook } from "./useFormHook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useFormLogin = (store, actions) => {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const loginValidations = (formState) => {
    const errors = {};
    if (!formState.user) {
      errors.user = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formState.user)) {
      errors.user = "El correo electrónico no es válido";
    }
    if (!formState.password) {
      errors.password = "La contraseña es requerida";
    }
    if (formState.password.length < 6) {
      errors.password = "La contraseña debe tener mas de 6 caracteres";
    }
    return errors;
  };

  const { formState, errors, onInputChange, onResetForm } = useFormHook(
    { user: "", password: "" },
    loginValidations
  );

  const { user, password } = formState;

  const validBakend = async () => {
    fetch(process.env.REACT_APP_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.msg === "Usuario no encontrado") {
          return toast.error("El usuario no existe");
        }
        if (data.msg === "Contraseña incorrecta") {
          return toast.error(data.msg);
        }
        actions.dataUserUpdate({
          id: data.id,
          telefono: data.telefono,
          email: data.email,
          usuario: data.usuario,
          es_admin: data.es_admin,
        });
        if (store.dataUser.id) {
          navigate("/comunity");
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            telefono: data.telefono,
            email: data.email,
            usuario: data.usuario,
            es_admin: data.es_admin,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const formErrors = loginValidations(formState);
    if (Object.keys(formErrors).length > 0) {
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    validBakend();
  };

  return {
    onInputChange,
    errors,
    password,
    user,
    formState,
    handleSubmit,
    onResetForm,
  };
};
