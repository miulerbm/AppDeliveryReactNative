import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { ClientProductItem } from "./Item";

// Accediendo a los params que llegan a la pantalla ClientProductListScreen
// Los cuales son 'navigation' y 'route'
interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductListScreen"> {}

export const ClientProductListScreen = ({ navigation, route }: Props) => {
  const { idCategory } = route.params;
  const { products, getProducts } = useViewModel();

  useEffect(() => {
    getProducts(idCategory);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <ClientProductItem product={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
