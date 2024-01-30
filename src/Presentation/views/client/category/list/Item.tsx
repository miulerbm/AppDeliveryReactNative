import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Category } from "../../../../../Domain/entities/Category";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { MyColors } from "../../../../theme/AppTheme";

interface Props {
  category: Category;
  height: number;
  width: number;
  // Objeto para navegar y mandar a una pantalla respectiva:
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

export const ClientCategoryItem = ({
  category,
  height,
  width,
  navigation,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // if (rol.name == "ADMIN") {
        //   navigation.replace("AdminTabsNavigator");
        // } else if (rol.name == "CLIENTE") {
        //   navigation.replace("ClientTabsNavigator");
        // }
      }}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: category.image }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Estilos de la tarjeta:
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
  },
  image: {
    flex: 1,
    // resizeMode: "contain", // Propiedad para que la imagen no se expanda tanto.
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleContainer: {
    height: 70,
    backgroundColor: "white",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20, // Solo funciona en Android
    shadowColor: "black", // Estilos de sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  title: {
    color: "black",
    fontSize: 18,
  },
});
