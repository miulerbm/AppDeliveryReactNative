import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, Text, ToastAndroid, View } from "react-native";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { Category } from "../../../../../Domain/entities/Category";
import useViewModel from "./ViewModel";
import { AdminProductListItem } from "./Item";

// Definimos las props desde las que accedemos a los params que nos manda el AdminProductNavigator:
interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  // Desestructuramos la categoría que viene con el route.params:
  const { category } = route.params;
  // En una constante traemos los datos del ViewModel
  const { products, responseMessage, getProducts, deleteProduct } =
    useViewModel();

  // Traemos los productos con un useEffect:
  useEffect(() => {
    getProducts(category.id!);
  }, []);

  // Otro useEffect para evaluar el estado del responseMessage:
  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  console.log("CATEGORY", JSON.stringify(category));
  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminProductListItem product={item} remove={deleteProduct} />
        )}
      />
    </View>
  );
};
