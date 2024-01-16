import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RoundedButton } from "../../../components/RoundedButton";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../../components/CustomTextInput";
import styles from "./Styles";
import { ModalPickImage } from "../../../components/ModalPickImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";
import { MyColors } from "../../../theme/AppTheme";

interface Props
  extends StackScreenProps<RootStackParamList, "ProfileUpdateScreen"> {}

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {
  // Accedemos a los campos

  const { user } = route.params;
  const {
    name,
    lastname,
    image,
    phone,
    loading,
    errorMessage,
    successMessage,
    onChange,
    onChangeInfoUpdate,
    update,
    pickImage,
    takePhoto,
  } = useViewModel(user);

  // Manejo de estados del Modal:
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect para saber en qué momento el errorMessage ya tiene asignado su valor
  // Quiero escuchar en qué momento ya tiene establecido su valor
  useEffect(() => {
    if (errorMessage != "") {
      // Si el errorMessage tiene algún contenido, que se muestre, sino, para qué :v
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage != "") {
      ToastAndroid.show(successMessage, ToastAndroid.LONG);
    }
  }, [successMessage]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/city.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        {/* Cuando pulsemos la imagen, ahora debe mostrar el modal, para elegir la opción de cámara o galería */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image == "" ? (
            <Image source={{ uri: user?.image }} style={styles.logoImage} />
          ) : (
            <Image source={{ uri: image }} style={styles.logoImage} />
          )}
        </TouchableOpacity>

        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>ACTUALIZAR</Text>

          <CustomTextInput
            placeholder="Nombres"
            image={require("../../../../../assets/user.png")}
            keyboardType="default"
            property="name"
            onChangeText={onChange}
            value={name}
          ></CustomTextInput>

          <CustomTextInput
            placeholder="Apellidos"
            image={require("../../../../../assets/my_user.png")}
            keyboardType="default"
            property="lastname"
            onChangeText={onChange}
            value={lastname}
          ></CustomTextInput>

          <CustomTextInput
            placeholder="Teléfono"
            image={require("../../../../../assets/phone.png")}
            keyboardType="numeric"
            property="phone"
            onChangeText={onChange}
            value={phone}
          ></CustomTextInput>

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="CONFIRMAR" onPress={() => update()} />
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
