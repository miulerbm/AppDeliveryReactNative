import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* EL fondo: */}
      <Image
        source={require("./assets/chef.jpg")}
        style={styles.imageBackground}
      />

      {/* El formulario: */}
      <View style={styles.form}></View>
    </View>
  );
}

// HOT RELOAD

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  // Creamos un estilo para la imagen de fondo:
  imageBackground: {
    // Se hace que la imagen ocupe todo el ancho y alto de la pantalla:
    width: "100%",
    height: "100%",
    bottom: "30%", // Con esto le decimos que suba un poco.
    // Opacidad de la imagen
    opacity: 0.7,
  },
  form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
