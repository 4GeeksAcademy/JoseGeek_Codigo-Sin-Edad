import { useState } from "react";

export const useFormHook = (initialForm = {}, validations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formState) => {
    let tempErrors = { ...errors };

    for (const field in fieldValues) {
      if (validations[field]) {
        tempErrors[field] = validations[field](fieldValues[field]);
      }
    }

    setErrors({
      ...tempErrors,
    });
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (validations[name]) {
      validate({ [name]: value });
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setErrors({});
  };

  const editForm = (nameTitle, nameDescription) => {
    setFormState({
      ...formState,
      [nameTitle.target.name]: nameTitle.target.value,
      [nameDescription.target.name]: nameDescription.target.value,
    });
  };

  return {
    ...formState,
    formState,
    errors,
    onInputChange,
    onResetForm,
    editForm,
  };
};
