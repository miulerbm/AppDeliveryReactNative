import React, { useState, useEffect } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { SaveUserUseCase } from "../../../Domain/useCases/userLocal/SaveUser";
import { GetUserUseCase } from "../../../Domain/useCases/userLocal/GetUser";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");

  // Se define a un objeto que almacenará los valores a guardar en el login y el register
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Llamamos a un useEffect para obtener la información del usuario
  // Esto se va a ejecutar cuando instanciemos el VM en la pantalla Home
  useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = async () => {
    const user = await GetUserUseCase();
    console.log("USUARIO SESION: ", JSON.stringify(user));
  };

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
      } else {
        // Si la respuesta fue correcta, almacenamos el usuario en sesión.
        await SaveUserUseCase(response.data);
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
