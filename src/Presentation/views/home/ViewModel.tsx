import React, { useState } from "react";

const HomeViewModel = () => {
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

  return {
    ...values,
    onChange,
  };
};

export default HomeViewModel;
