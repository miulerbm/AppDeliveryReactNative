import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/Presentation/views/home/Home";
import { RegisterScreen } from "./src/Presentation/views/register/Register";
import { ProfileInfoScreen } from "./src/Presentation/views/profile/info/ProfileInfo";
import { RolesScreen } from "./src/Presentation/views/roles/Roles";
import { AdminTabsNavigator } from "./src/Presentation/navigator/AdminTabsNavigator";
import { ClientTabsNavigator } from "./src/Presentation/navigator/ClientTabsNavigator";
import { ProfileUpdateScreen } from "./src/Presentation/views/profile/update/ProfileUpdate";
import { User } from "./src/Domain/entities/User";
import { UserProvider } from "./src/Presentation/context/UserContext";
import { AdminCategoryCreateScreen } from "./src/Presentation/views/admin/category/create/CategoryCreate";
import { AdminCategoryUpdateScreen } from "./src/Presentation/views/admin/category/update/CategoryUpdate";
import { Category } from "./src/Domain/entities/Category";

// Necesitamos definir una configuración para manejar las pantallas:
// Como, el tipo de dato que se le va a pasar y que van a mostrar las pantallas
// Lista de parámetros de pila:
export type RootStackParamList = {
  // A la pantalla inicial no se le pasa ningún dato:
  HomeScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  AdminTabsNavigator: undefined;
  ClientTabsNavigator: undefined;
  ProfileUpdateScreen: { user: User };
  AdminCategoryCreateScreen: undefined;
  AdminCategoryUpdateScreen: { category: Category };
};

// Declaramos que la función va retornar un objeto del tipo RootStackParamList
// Facilita el manejo de los tipos de datos que se pueden pasar a las diferentes vistas.
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <UserState>
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

          <Stack.Screen
            name="RolesScreen"
            component={RolesScreen}
            options={{
              headerShown: true,
              title: "Selecciona un rol",
            }}
          />

          <Stack.Screen
            name="AdminTabsNavigator"
            component={AdminTabsNavigator}
          />
          <Stack.Screen
            name="ClientTabsNavigator"
            component={ClientTabsNavigator}
          />

          <Stack.Screen
            name="ProfileUpdateScreen"
            component={ProfileUpdateScreen}
            options={{
              headerShown: true,
              title: "Actualizar usuario",
            }}
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
      </UserState>
    </NavigationContainer>
  );
};

// Instanciamos el UserContext para utilizar las variables en un contexto global
// Ahora, el UserState propaga información a todas las pantallas que encierra

const UserState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};

export default App;
