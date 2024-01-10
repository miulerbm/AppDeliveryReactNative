import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      // Si todo es validado:
      const response = await RegisterAuthUseCase(values);
      console.log("RESULT", JSON.stringify(response));
    }
  };

  // Validación del formulario:
  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Ingresa tu nombre");
      return false;
    }

    if (values.lastname === "") {
      setErrorMessage("Ingresa tu apellido");
      return false;
    }

    if (values.email === "") {
      setErrorMessage("Ingresa tu correo electrónico");
      return false;
    }

    if (values.phone === "") {
      setErrorMessage("Ingresa tu teléfono");
      return false;
    }

    if (values.password === "") {
      setErrorMessage("Ingresa tu contraseña");
      return false;
    }

    if (values.confirmpassword === "") {
      setErrorMessage("Confirma tu contraseña");
      return false;
    }

    if (values.password !== values.confirmpassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    register,
    errorMessage,
  };
};

export default RegisterViewModel;
