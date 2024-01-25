import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminProductCreateViewModel = () => {
  const [values, setValues] = useState({
    // Para manejar los datos de un producto, definimos sus props:
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    id_category: "",
    price: "",
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  // Método para abrir la cámara:
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  // Método para limpiar el formulario luego de crear la categoría
  const resetForm = async () => {
    // setValues({ name: "", description: "", image: "" });
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    createCategory,
    loading,
    responseMessage,
  };
};

export default AdminProductCreateViewModel;
