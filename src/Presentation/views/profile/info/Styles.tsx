import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    bottom: "30%",
    opacity: 0.7,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "11%",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },

  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formImage: {
    height: 30,
    width: 30,
  },
  formInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  formContent: {
    marginLeft: 15,
  },
  formTextDescription: {
    fontSize: 12,
    color: "gray",
  },
  logout: {
    position: "absolute",
    top: 30,
    right: 15,
  },
  logoutImage: {
    width: 40,
    height: 40,
  },
});

export default ProfileInfoStyles;
