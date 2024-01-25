import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AdminProductListScreen } from "../views/admin/product/list/ProductList";
import { Category } from "../../Domain/entities/Category";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "./AdminCategoryNavigator";

export type ProductStackParamList = {
  // Definimos las pantallas con la que este navigator trabajará
  AdminProductListScreen: { category: Category };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

// Definimos propiedades para pasarle la categoría a la view ProductList
// Es decir, indicarle qué botón hemos pulsado para que nos muestre la lista correspondiente.
interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductNavigator"> {}
// Una vez hecho esto, podemos desestructurar de las propiedades el objeto navigation y el objeto route.

export const AdminProductNavigator = ({ navigation, route }: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Dentro de esto, irán ciertas pantallas: */}
      <Stack.Screen
        // La primera pantalla se trata de la lista de productos que pertenecen a la categoría seleccionada.
        name="AdminProductListScreen"
        component={AdminProductListScreen}
        // Definimos en initialParams, el parámetro inicial que recibe l pantalla
        // Estamos pasando parámetros del NAvigator, a una pantalla que se está renderizando dentro de dicho navigator:
        initialParams={{ category: route.params.category }}
      />
    </Stack.Navigator>
  );
};
