import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";

export const RegisterScreen = () => {
  // Accedemos a los campos

  const {
    name,
    lastname,
    email,
    phone,
    password,
    confirmpassword,
    onChange,
    register,
  } = useViewModel();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/chef.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/user_image.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>REGISTRARSE</Text>

        <CustomTextInput
          placeholder="Nombres"
          image={require("../../../../assets/user.png")}
          keyboardType="default"
          property="name"
          onChangeText={onChange}
          value={name}
        ></CustomTextInput>

        <CustomTextInput
          placeholder="Apellidos"
          image={require("../../../../assets/my_user.png")}
          keyboardType="default"
          property="lastname"
          onChangeText={onChange}
          value={lastname}
        ></CustomTextInput>

        <CustomTextInput
          placeholder="Correo electrónico"
          image={require("../../../../assets/email.png")}
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        ></CustomTextInput>

        <CustomTextInput
          placeholder="Teléfono"
          image={require("../../../../assets/phone.png")}
          keyboardType="numeric"
          property="phone"
          onChangeText={onChange}
          value={phone}
        ></CustomTextInput>

        <CustomTextInput
          placeholder="Contraseña"
          image={require("../../../../assets/password.png")}
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        ></CustomTextInput>

        <CustomTextInput
          placeholder="Confirmar contraseña"
          image={require("../../../../assets/confirm_password.png")}
          keyboardType="default"
          property="confirmpassword"
          onChangeText={onChange}
          value={confirmpassword}
          secureTextEntry={true}
        ></CustomTextInput>

        <View style={{ marginTop: 30 }}>
          <RoundedButton text="CONFIRMAR" onPress={() => register()} />
        </View>
      </View>
    </View>
  );
};
