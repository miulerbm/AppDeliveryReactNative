import React, { useState } from "react";
import { ApiDelivery } from "../../../../Data/sources/remote/api/ApiDelivery";
import * as ImagePicker from "expo-image-picker";
// Importamos el caso de uso que permite almacenar la sesión del usuario:
import { SaveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/SaveUserLocal";
// También el hook para traer la sesión del usuario
import { useUserLocal } from "../../../hooks/useUserLocal";
import { UpdateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser";
import { UpdateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser";
import { User } from "../../../../Domain/entities/User";
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery";

const ProfileUpdateViewModel = (user: User) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { getUserSession } = useUserLocal();

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

  // Actualizamos los valores uno por uno para el update:
  const onChangeInfoUpdate = (
    name: string,
    lastname: string,
    phone: string
  ) => {
    setValues({ ...values, name, lastname, phone });
  };

  const update = async () => {
    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (values.image?.includes("https://")) {
        response = await UpdateUserUseCase(values);
      } else {
        response = await UpdateWithImageUserUseCase(values, file!);
      }

      setLoading(false);
      console.log("RESULT", JSON.stringify(response));
      if (response.success) {
        await SaveUserLocalUseCase(response.data);
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

    if (values.phone === "") {
      setErrorMessage("Ingresa tu teléfono");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    onChangeInfoUpdate,
    update,
    pickImage,
    takePhoto,
    errorMessage,
    loading,
    user,
  };
};

export default ProfileUpdateViewModel;
