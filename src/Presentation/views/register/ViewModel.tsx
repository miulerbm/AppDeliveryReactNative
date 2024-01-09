import React, { useState } from "react";

const RegisterViewModel = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // con OnChange, definimos que setValues modifique a uno de los atributos del objeto
  // definido, le decimos, esta "propiedad" <- "valor", le cargamos el valor a un estado.
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Evento para cuando se pulse el botón CONFIRMAR (componente externo)

  const register = () => {
    console.log(JSON.stringify(values));
  };

  // Esta función hará accesible los estados y el método onChange
  return {
    ...values,
    onChange,
    register,
  };
};

export default RegisterViewModel;
