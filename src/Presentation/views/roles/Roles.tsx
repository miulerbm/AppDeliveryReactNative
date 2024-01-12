import React, { useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import useViewModel from "./ViewModel";
import { RolesItem } from "./Item";
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const RolesScreen = () => {
  const { user } = useViewModel();

  //Obteniendo el total de la pantalla:
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // Arreglando la visualización del carrusel:
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");

  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        {/* <FlatList
        data={user?.roles}
        renderItem={({ item }) => (
          <RolesItem rol={item} height={420} width={width - 100} />
        )}
        keyExtractor={(item) => item.id}
      /> */}

        <Carousel
          loop={false}
          width={width}
          height={height / 1.5} // Ajustando la altura del elemento
          autoPlay={false}
          data={user?.roles!}
          scrollAnimationDuration={5000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <RolesItem rol={item} height={420} width={width - 100} />
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
