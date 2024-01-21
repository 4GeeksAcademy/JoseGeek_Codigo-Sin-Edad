import React from "react";
import { useFormHook } from "./useFormHook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useFormRegister = (store, actions) => {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const registerValidations = (formState) => {
    const errors = {};
    if (!formState.user) {
      errors.user = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formState.user)) {
      errors.user = "El correo electrónico no es válido";
    }
    if (!formState.password) {
      errors.password = "La contraseña es requerida";
    }
    if (!formState.usuario) {
      errors.password = "El nombre de usuario es requerida";
    }
    if (formState.password.length < 6) {
      errors.password = "La contraseña debe tener mas de 6 caracteres";
    }
    if (formState.telefono.length < 9) {
      errors.password = "El telefono debe tener mas de 9 caracteres";
    }
    return errors;
  };

  const { formState, errors, onInputChange, onResetForm } = useFormHook(
    { user: "", password: "", telefono: "", usuario: "" },
    registerValidations
  );

  const { user, password, telefono, usuario } = formState;

  const validBackendRegister = async () => {
    fetch(process.env.REACT_APP_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        password: password,
        telefono: telefono,
        usuario: usuario,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.msg === "El usuario con este email ya existe") {
          return toast.error("El usuario con este email ya existe");
        }
        if (data.msg === "El nombre de usuario ya existe ya existe") {
          return toast.error("El nombre de usuario ya existe ya existe");
        }
        actions.dataUserUpdate({
          id: data.id,
          telefono: data.telefono,
          email: data.email,
          usuario: usuario,
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
            usuario: usuario,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitRegister = () => {
    const formErrors = registerValidations(formState);
    if (Object.keys(formErrors).length > 0) {
      Object.values(formErrors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    validBackendRegister();
  };

  return {
    onInputChange,
    errors,
    password,
    usuario,
    user,
    telefono,
    formState,
    handleSubmitRegister,
    onResetForm,
  };
};
