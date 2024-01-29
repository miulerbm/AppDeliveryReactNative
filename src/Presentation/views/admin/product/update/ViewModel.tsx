import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory";
import { CategoryContext } from "../../../../context/CategoryContext";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery";

const AdminProductUpdateViewModel = (product: Product, category: Category) => {
  // En el useState pasamos el producto que estamos recibiendo por parámetro
  // para cargar los valores que ya se tenían en los inputs
  const [values, setValues] = useState(product);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Manejamos los 3 archivos a subir:
  const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>();
  const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>();
  const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>();

  const { update, updateWithImage } = useContext(ProductContext);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const updateProduct = async () => {
    console.log("PRODUCTO FORMULARIO", JSON.stringify(values));
    let files = [];
    files.push(file1!);
    files.push(file2!);
    files.push(file3!);
    setLoading(true);
    let response = {} as ResponseApiDelivery; // Si el usuario selecciona la imagen vendría como "file://nombre.png..."
    if (
      values.image1.includes("https://") &&
      values.image2.includes("https://") &&
      values.image3.includes("https://")
    ) {
      // Si no se seleccionaron imágenes:
      response = await update(values);
    } else {
      // Si se seleccionaron imágenes:
      response = await updateWithImage(values, files);
    }
    setLoading(false);

    setResponseMessage(response.message);
    // Validamos si se hace con imágenes o sin imágenes el update:
  };

  const pickImage = async (numberImage: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Preguntamos si el número que se mandó por parámetro es igual a 1:
      if (numberImage == 1) {
        onChange("image1", result.assets[0].uri);
        setFile1(result.assets[0]);
      }
      // Así con los demás:
      if (numberImage == 2) {
        onChange("image2", result.assets[0].uri);
        setFile2(result.assets[0]);
      }
      if (numberImage == 3) {
        onChange("image3", result.assets[0].uri);
        setFile3(result.assets[0]);
      }
    }
  };

  // Método para abrir la cámara:
  const takePhoto = async (numberImage: number) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Preguntamos si el número que se mandó por parámetro es igual a 1:
      if (numberImage == 1) {
        onChange("image1", result.assets[0].uri);
        setFile1(result.assets[0]);
      }
      // Así con los demás:
      if (numberImage == 2) {
        onChange("image2", result.assets[0].uri);
        setFile2(result.assets[0]);
      }
      if (numberImage == 3) {
        onChange("image3", result.assets[0].uri);
        setFile3(result.assets[0]);
      }
    }
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    updateProduct,
    loading,
    responseMessage,
  };
};

export default AdminProductUpdateViewModel;
