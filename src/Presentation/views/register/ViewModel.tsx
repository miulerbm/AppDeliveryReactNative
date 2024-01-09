import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";

const RegisterViewModel = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });

  // con OnChange, definimos que setValues modifique a uno de los atributos del objeto
  // definido, le decimos, esta "propiedad" <- "valor", le cargamos el valor a un estado.
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Evento para cuando se pulse el botón CONFIRMAR (componente externo)

  const register = async () => {
    // En el botón Register, vamos a comunicarnos con la base de datos
    // mediante una petición HTTP para hacer un POST y añadir un usuario nuevo.
    try {
      // El post de axios tiene la ruta y los valores como atributos.
      const response = await ApiDelivery.post("/users/create", values); //Esta es la ruta definida en el backend para crear un user
      console.log("response: ", JSON.stringify(response.data)); //Solo quiero ver la parte de data, en response.
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // Esta función hará accesible los estados y el método onChange
  return {
    ...values,
    onChange,
    register,
  };
};

export default RegisterViewModel;
