import React from "react";
import { Category } from "../../Domain/entities/Category";
import { RootStackParamList } from "./MainStackNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryProvider } from "../context/CategoryContext";
import { AdminCategoryCreateScreen } from "../views/admin/category/create/CategoryCreate";
import { AdminCategoryUpdateScreen } from "../views/admin/category/update/CategoryUpdate";
import { AdminCategoryListScreen } from "../views/admin/category/list/CategoryList";
import { Image, TouchableOpacity } from "react-native";

// Este Stack manejará las 3 pantallas de Admin Category: List, Create, Edit
// Será eruivalente al Main, solo que será solo para Admin Category Management

export type CategoryStackParamList = {
  AdminCategoryListScreen: undefined;
  AdminCategoryCreateScreen: undefined;
  AdminCategoryUpdateScreen: { category: Category };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
  return (
    <CategoryState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          // Solo a esta pantalla le activamos el headerShown
          name="AdminCategoryListScreen"
          component={AdminCategoryListScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Categorías",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminCategoryCreateScreen")}
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
          name="AdminCategoryCreateScreen"
          component={AdminCategoryCreateScreen}
          options={{
            headerShown: true,
            title: "Nueva categoría",
          }}
        />

        <Stack.Screen
          name="AdminCategoryUpdateScreen"
          component={AdminCategoryUpdateScreen}
          options={{
            headerShown: true,
            title: "Editar categoría",
          }}
        />
      </Stack.Navigator>
    </CategoryState>
  );
};

const CategoryState = ({ children }: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};
