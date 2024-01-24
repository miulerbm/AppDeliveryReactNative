import React, { useState, useEffect } from "react";
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
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";
import { RootStackParamList } from "../../navigator/MainStackNavigator";

// Vamos a cambiar que, el navigation se pase como un prop:

interface Props extends StackScreenProps<RootStackParamList, "HomeScreen"> {}

export const HomeScreen = ({ navigation, route }: Props) => {
  // Usando el ViewModel, desestructuramos los valores:
  const { email, password, errorMessage, onChange, login, user } =
    useViewModel();
  // Recuerda que errorMessage trabaja con una función asíncrona, usar useEffect para escuchar los cambios.

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    // Cuando cambie el estado del user:
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      // Validamos si el usuario tiene más de un rol:
      if (user.roles?.length! > 1) {
        navigation.replace("RolesScreen");
      } else {
        // Si no tiene más de un rol, lo mandamos directo a ProfileInfoScreen:
        // Utilizamos el navigation para pasar a la pantalla profile:
        navigation.replace("ClientTabsNavigator");
      }
    }
  }, [user]);

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
          <RoundedButton text="LOGIN" onPress={() => login()} />
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
