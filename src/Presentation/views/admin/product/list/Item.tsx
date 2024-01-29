import React from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Product } from "../../../../../Domain/entities/Product";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";

interface Props {
  product: Product;
  // Además del producto, recibiremos la categoría
  category: Category;
  // Debemos pasarle el método delete a este item:
  remove: (product: Product) => void;
}

export const AdminProductListItem = ({ product, category, remove }: Props) => {
  // Utilizamos este objeto para pasar a la siguiente pantalla (actualizar categoría).
  // Ahpra le pasamos el CategoryStackParamList
  const navigation =
    useNavigation<StackNavigationProp<ProductStackParamList>>();
  return (
    <TouchableOpacity
    // Hacemos que, al presionar sobre un ítem, nos lleve a la pantalla AdminProductNavigator
    // onPress={() =>
    //   navigation.navigate("AdminProductNavigator", { category: category })
    // }
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image1 }} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>S/. {product.price}</Text>
        </View>
        <View style={styles.actionContainer}>
          {/* Utilizando el navigation.navigate, pasamos al Update Category: */}
          <TouchableOpacity
            // Al presionar en el botón edit debe mandarnos a la pantalla de Update:
            onPress={() =>
              navigation.navigate("AdminProductUpdateScreen", {
                product: product,
                category: category,
              })
            }
          >
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/edit.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => remove(product)}>
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/trash.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 90,
    marginHorizontal: 20,
    marginTop: 10,
    paddingTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  description: {
    color: "gray",
    fontSize: 12,
    marginTop: 3,
  },
  price: {
    color: "green",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "bold",
  },
  actionContainer: {
    marginRight: 40,
  },
  actionImage: {
    width: 25,
    height: 25,
    marginVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    flex: 1,
    marginHorizontal: 30,
  },
});
