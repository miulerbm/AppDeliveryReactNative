import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Definimos qué parámetros podemos pasar al Rounded Button:
interface Props {
  text: string;
}

export const RoundedButton = ({ text }: Props) => {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={() => {}}>
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
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textButtton: {
    color: "white",
    fontWeight: "bold",
  },
});
