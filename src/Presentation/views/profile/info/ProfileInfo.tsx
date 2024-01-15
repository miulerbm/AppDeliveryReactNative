import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import useViewModel from "./ViewModel";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { RoundedButton } from "../../../components/RoundedButton";

export const ProfileInfoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { removeSession, user } = useViewModel();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../assets/chef.jpg")}
        style={styles.imageBackground}
      />

      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          removeSession();
          navigation.replace("HomeScreen");
        }}
      >
        <Image
          source={require("../../../../../assets/logout.png")}
          style={styles.logoutImage}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={{ uri: user?.image }} style={styles.logoImage} />
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../assets/user.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.name} {user?.lastname}
            </Text>
            <Text style={styles.formTextDescription}>Nombre del usuario</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require("../../../../../assets/email.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.email}</Text>
            <Text style={styles.formTextDescription}>Correo electrónico</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 70 }}>
          <Image
            source={require("../../../../../assets/phone.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.phone}</Text>
            <Text style={styles.formTextDescription}>Teléfono</Text>
          </View>
        </View>

        <RoundedButton
          onPress={() => {}}
          text="ACTUALIZAR INFORMACIÓN"
        ></RoundedButton>
      </View>
    </View>
  );
};

{
  /* <Button
onPress={() => {
  removeSession();
  navigation.navigate("HomeScreen");
}}
title="Cerrar sesión"
></Button> */
}
