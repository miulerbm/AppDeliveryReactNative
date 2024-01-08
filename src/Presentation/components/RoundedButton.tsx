import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MyColors } from "../theme/AppTheme";

// Definimos qué parámetros podemos pasar al Rounded Button:
interface Props {
  text: string;
  // Habrá una props que será una función que no retorne nada.
  onPress: () => void;
}

export const RoundedButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={() => onPress()}>
      <Text style={styles.textButtton}>{text}</Text>
    </TouchableOpacity>
  );
};

// TouchableOpacity es como un view

// Vamos a definir los estilos del componente:

const styles = StyleSheet.create({
  roundedButton: {
    width: "100%",
    height: 50,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textButtton: {
    color: "white",
    fontWeight: "bold",
  },
});
