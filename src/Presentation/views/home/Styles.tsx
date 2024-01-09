import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
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

  // Estilos para el formulario:
  form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30, // pd para margen interno, mg para margen externo
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formTextInput: {
    flex: 1, //Con esto la línea del text Input ocupa todo el ancho disponible
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30, //Para que se vea más separado del 'ENTRAR'
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontWeight: "bold",
    marginLeft: 10,
  },

  // Estilo para el logo de la pantalla inicial:
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  // El estilo para la imagen del logo:
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default HomeStyles;
