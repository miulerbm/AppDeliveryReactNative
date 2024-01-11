import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import * as ImagePicker from "expo-image-picker";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    image: "",
    password: "",
    confirmpassword: "",
  });

  // useState para manejar la imagen:
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();

  // Método para seleccionar la imagen:
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
    pickImage,
    takePhoto,
    errorMessage,
  };
};

export default RegisterViewModel;
