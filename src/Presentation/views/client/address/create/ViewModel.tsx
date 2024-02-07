import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { CategoryContext } from "../../../../context/CategoryContext";
import { CreateAddressUseCase } from "../../../../../Domain/useCases/address/CreateAddress";
import { UserContext } from "../../../../context/UserContext";

const ClientAddressCreateViewModel = () => {
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    refPoint: "",
    lat: 0.0,
    lng: 0.0,
    id_user: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Cuando el estado del usuario cambie:
    if (user.id != "") {
      onChange("id_user", user.id);
    }
  }, [user]);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Nuevo método para cambiar tres valores de params de address:
  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint: refPoint, lat: lat, lng: lng });
  };

  const createAddress = async () => {
    console.log("FORMULARIO: " + JSON.stringify(values));
    setLoading(true);
    const response = await CreateAddressUseCase(values);
    setLoading(false);
    setResponseMessage(response.message);
    resetForm();
  };

  // Método para limpiar el formulario luego de crear la categoría
  const resetForm = async () => {
    setValues({
      address: "",
      neighborhood: "",
      refPoint: "",
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!,
    });
  };

  return {
    ...values,
    onChange,
    onChangeRefPoint,
    createAddress,
    loading,
    responseMessage,
  };
};

export default ClientAddressCreateViewModel;
