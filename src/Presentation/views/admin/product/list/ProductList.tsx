import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { Category } from "../../../../../Domain/entities/Category";

// Definimos las props desde las que accedemos a los params que nos manda el AdminProductNavigator:
interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  // Desestructuramos la categoría que viene con el route.params:
  const { category } = route.params;
  console.log("CATEGORY", JSON.stringify(category));
  return (
    <View>
      <Text>AdminProductListScreen</Text>
    </View>
  );
};
