import React from "react";
import { Button, Text, View } from "react-native";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";

interface Props
  extends StackScreenProps<RootStackParamList, "ProfileInfoScreen"> {}
export const ProfileInfoScreen = ({ navigation, route }: Props) => {
  const { removeSession } = useViewModel();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => {
          // No solo se debe eliminar la sesión, sino también devolver al usuario a la pantalla principal
          removeSession();
          // Usamos el objeto navigation del StackScreenProps
          navigation.navigate("HomeScreen");
        }}
        title="Cerrar sesión"
      ></Button>
    </View>
  );
};
