import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AdminProductListScreen } from "../views/admin/product/list/ProductList";
import { Category } from "../../Domain/entities/Category";
import { StackScreenProps } from "@react-navigation/stack";
import { CategoryStackParamList } from "./AdminCategoryNavigator";
import { AdminProductCreateScreen } from "../views/admin/product/create/ProductCreate";
import { Image, TouchableOpacity } from "react-native";
import { ProductProvider } from "../context/ProductContext";
import { AdminProductUpdateScreen } from "../views/admin/product/update/ProductUpdate";
import { Product } from "../../Domain/entities/Product";

export type ProductStackParamList = {
  // Definimos las pantallas con la que este navigator trabajará
  AdminProductListScreen: { category: Category };
  // Añadimos la pantalla de AdminProductCreateScreen
  AdminProductCreateScreen: { category: Category };
  AdminProductUpdateScreen: { category: Category; product: Product };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

// Definimos propiedades para pasarle la categoría a la view ProductList
// Es decir, indicarle qué botón hemos pulsado para que nos muestre la lista correspondiente.
interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductNavigator"> {}
// Una vez hecho esto, podemos desestructurar de las propiedades el objeto navigation y el objeto route.

export const AdminProductNavigator = ({ navigation, route }: Props) => {
  return (
    <ProductState>
      {/* La información definida en el ProductState se propaga en todos los componentes envueltos */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Dentro de esto, irán ciertas pantallas: */}
        <Stack.Screen
          // La primera pantalla se trata de la lista de productos que pertenecen a la categoría seleccionada.
          name="AdminProductListScreen"
          component={AdminProductListScreen}
          // Definimos en initialParams, el parámetro inicial que recibe l pantalla
          // Estamos pasando parámetros del NAvigator, a una pantalla que se está renderizando dentro de dicho navigator:
          initialParams={{ category: route.params.category }}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Productos",
            headerRight: () => (
              <TouchableOpacity
                // Cuando elegimos crear un producto, navegamos a AdminProductCreateScreen
                onPress={() => navigation.navigate("AdminProductCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          // Nuevo stack screen, crear producto
          name="AdminProductCreateScreen"
          component={AdminProductCreateScreen}
          // Tenemos la opción de pasar los parámetros que vienen de la pantalla principal, o pasarlo
          // cuando naveguemos desde la pantalla de ProductList
          initialParams={{ category: route.params.category }}
          options={{
            title: "Nuevo Producto",
            headerShown: true,
          }}
        />

        <Stack.Screen
          // Nuevo stack screen, crear producto
          name="AdminProductUpdateScreen"
          component={AdminProductUpdateScreen}
          // Tenemos la opción de pasar los parámetros que vienen de la pantalla principal, o pasarlo
          // cuando naveguemos desde la pantalla de ProductList
          options={{
            title: "Actualizar Producto",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </ProductState>
  );
};

const ProductState = ({ children }: any) => {
  // Podemos envolver a nuestro navigator con este State
  // para propagar toda la info que requerimos.
  return <ProductProvider>{children}</ProductProvider>;
};
