import React, { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";
import { RegisterWithImageAuthUseCase } from "../../../Domain/useCases/auth/RegisterWithImageAuth";
import * as ImagePicker from "expo-image-picker";
// Importamos el caso de uso que permite almacenar la sesión del usuario:
import { SaveUserLocalUseCase } from "../../../Domain/useCases/userLocal/SaveUserLocal";
// También el hook para traer la sesión del usuario
import { useUserLocal } from "../../hooks/useUserLocal";

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

  // State Loading para manejar si se está cargando o no una imagen:
  const [loading, setLoading] = useState(false);

  // useState para manejar la imagen:
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  // Creamos una const para traer el user:
  const { user, getUserSession } = useUserLocal();

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
      // Establecemos al Loading en True al iniciar el registro:
      setLoading(true);
      // Si todo es validado:
      // const response = await RegisterAuthUseCase(values);
      const response = await RegisterWithImageAuthUseCase(values, file!); // file puede venir como nulo!
      // Una vez terminado el registro y se ha obtenido una respuesta, ponemos al Loading en false:
      setLoading(false);

      console.log("RESULT", JSON.stringify(response));

      if (response.success) {
        await SaveUserLocalUseCase(response.data);
        // Traemos el hook para recargar el estado del usuario, y que nos lleve a la siguiente pantalla:
        getUserSession();
      } else {
        setErrorMessage(response.message);
      }
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

    if (values.image === "") {
      setErrorMessage("Seleccione una imagen");
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
    loading,
    user,
  };
};

export default RegisterViewModel;
