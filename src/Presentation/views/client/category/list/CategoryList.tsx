import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { ClientCategoryItem } from "./Item";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();

  //Obteniendo el total de la pantalla:
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  // Arreglando la visualización del carrusel:
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");

  // Usamos un useEffect para llamar a las categorías:
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: height * 0.1,
        }}
      >
        <Carousel
          loop={false}
          width={width}
          height={height} // Ajustando la altura del elemento
          autoPlay={false}
          data={categories}
          scrollAnimationDuration={5000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <ClientCategoryItem
              category={item}
              height={height * 0.62}
              width={width - 70}
              navigation={navigation}
            />
          )}
          modeConfig={{
            snapDirection,
            stackInterval: 30,
          }}
          mode={mode}
        />
      </View>
    </GestureHandlerRootView>
  );
};
