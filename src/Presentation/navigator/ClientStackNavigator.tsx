import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";

export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { idCategory: string };
  ClientProductDetailScreen: { product: Product };
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  return (
    //Propagamos el ShoppingProvider Context envolviendo al navigator:
    <ShoppingBagState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={"ClientCategoryListScreen"}
          component={ClientCategoryListScreen}
          options={{ headerShown: true, title: "Categorías" }}
        />
        <Stack.Screen
          name={"ClientProductListScreen"}
          component={ClientProductListScreen}
          options={{
            headerShown: true,
            title: "Productos",
          }}
        />
        <Stack.Screen
          name={"ClientProductDetailScreen"}
          component={ClientProductDetailScreen}
        />
      </Stack.Navigator>
    </ShoppingBagState>
  );
};

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};
