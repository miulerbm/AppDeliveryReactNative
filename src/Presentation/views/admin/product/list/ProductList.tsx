import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { Category } from "../../../../../Domain/entities/Category";
import useViewModel from "./ViewModel";

// Definimos las props desde las que accedemos a los params que nos manda el AdminProductNavigator:
interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  // Desestructuramos la categoría que viene con el route.params:
  const { category } = route.params;
  // En una constante traemos los datos del ViewModel
  const { products, getProducts } = useViewModel();

  // Traemos los productos con un useEffect:
  useEffect(() => {
    getProducts(category.id!);
  }, []);

  console.log("CATEGORY", JSON.stringify(category));
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};
