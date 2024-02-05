import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";

const ClientAddressCreateViewModel = () => {
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    refPoint: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  // Creamos una nueva const
  const { create } = useContext(CategoryContext);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createCategory = async () => {
    // setLoading(true);
    // const response = await create(values, file!);
    // setLoading(false);
    // setResponseMessage(response.message);
    // resetForm();
  };

  // Método para limpiar el formulario luego de crear la categoría
  const resetForm = async () => {
    // setValues({ name: "", description: "", image: "" });
  };

  return {
    ...values,
    onChange,
    createCategory,
    loading,
    responseMessage,
  };
};

export default ClientAddressCreateViewModel;
