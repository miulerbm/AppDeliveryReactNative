import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientOrderListScreen } from "../views/client/order/list/OrderList";

const Tab = createBottomTabNavigator();

export const ClientTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ClientCategoryListScreen"
        component={ClientCategoryListScreen}
      />
      <Tab.Screen
        name="ClientOrderListScreen"
        component={ClientOrderListScreen}
      />
      <Tab.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
    </Tab.Navigator>
  );
};
