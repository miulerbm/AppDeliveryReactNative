import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/Presentation/views/home/Home";
import { RegisterScreen } from "./src/Presentation/views/register/Register";

// Necesitamos definir una configuración para manejar las pantallas:
// Como, el tipo de dato que se le va a pasar y que van a mostrar las pantallas
// Lista de parámetros de pila:
export type RootStackParamList = {
  // A la pantalla inicial no se le pasa ningún dato:
  HomeScreen: undefined;
  RegisterScreen: undefined;
};

// Declaramos que la función va retornar un objeto del tipo RootStackParamList
// Facilita el manejo de los tipos de datos que se pueden pasar a las diferentes vistas.
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*   Este elemento va a contener todas las pantallas */}
        {/* El orden en el que van, debe ser la principal, luego secundaria, etc... */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: "Nuevo Usuario",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
