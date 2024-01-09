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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    bottom: "30%",
    opacity: 0.7,
  },

  form: {
    width: "100%",
    height: "73%", // Hacemos que el form ocupe más espacio
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontWeight: "bold",
    marginLeft: 10,
  },

  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "5%",
    alignItems: "center",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
});
