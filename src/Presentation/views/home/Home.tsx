import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RoundedButton } from "../../../Presentation/components/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../components/CustomTextInput";

export const HomeScreen = () => {
  // Usando el ViewModel, desestructuramos los valores:
  const { email, password, onChange } = useViewModel();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* EL fondo: */}
      <Image
        source={require("../../../../assets/chef.jpg")}
        style={styles.imageBackground}
      />

      {/* Una imagen para la pantalla: */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Food App</Text>
      </View>

      {/* El formulario: */}
      <View style={styles.form}>
        {/* Los elementos del formulario: */}
        {/* Primero el texto 'INGRESAR': */}
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        />

        {/* CONTRASEÑA: */}
        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />

        {/* BOTÓN DE 'ENTRAR'*/}
        {/* <View style={{ marginTop: 30 }}>
              <Button
                title="ENTRAR"
                onPress={() => ToastAndroid.show("Clicked!", ToastAndroid.LONG)}
                color="orange"
              />
            </View> */}

        <View style={{ marginTop: 30 }}>
          <RoundedButton
            text="ENTRAR"
            onPress={() => {
              console.log("email: ", email);
              console.log("password: ", password);
            }}
          />
        </View>

        {/* Footer de 'No tienes cuenta // Regístrate' */}
        <View style={styles.formRegister}>
          <Text>No tienes Cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {/* Se añade un touchable opacity para darle un evento click a Regístrate */}
            <Text style={styles.formRegisterText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// HOT RELOAD

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  // Creamos un estilo para la imagen de fondo:
  imageBackground: {
    // Se hace que la imagen ocupe todo el ancho y alto de la pantalla:
    width: "100%",
    height: "100%",
    bottom: "30%", // Con esto le decimos que suba un poco.
    // Opacidad de la imagen
    opacity: 0.7,
  },

  // Estilos para el formulario:
  form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30, // pd para margen interno, mg para margen externo
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
    flex: 1, //Con esto la línea del text Input ocupa todo el ancho disponible
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30, //Para que se vea más separado del 'ENTRAR'
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontWeight: "bold",
    marginLeft: 10,
  },

  // Estilo para el logo de la pantalla inicial:
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  // El estilo para la imagen del logo:
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
