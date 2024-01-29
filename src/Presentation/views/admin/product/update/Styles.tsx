import { StyleSheet } from "react-native";

const AdminProductUpdateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-around", // Distribuye las imágenes al ancho de la pantalla
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
  form: {
    backgroundColor: "white",
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    // position: "absolute",
    // bottom: 20,
    // left: 20,
    // right: 20,
    marginTop: 50,
  },
  categoryInfo: {
    // flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCategory: {
    width: 30,
    height: 30,
  },
  textCategory: {
    // marginLeft: 10,
    color: "gray",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default AdminProductUpdateStyles;
