import React, { useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");

  // Se define a un objeto que almacenará los valores a guardar en el login y el register
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Con este método lo que haremos es, al atributo dentro del objeto values, le pasaremos un valor:
  // Y ese valor lo asignaremos al atributo especificado con el setValues del useState
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("RESPONSE: " + JSON.stringify(response));
      if (!response.success) {
        // Si la respuesta no es exitosa
        setErrorMessage(response.message);
      }
    }
  };

  // Validando que se ingresen datos:
  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingresa el correo electrónico");
      return false;
    }

    if (values.password === "") {
      setErrorMessage("Ingresa la contraseña");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    login,
    errorMessage,
  };
};

export default HomeViewModel;
