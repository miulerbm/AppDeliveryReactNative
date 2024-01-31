import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import styles from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductDetailScreen"> {}

export const ClientProductDetailScreen = ({ navigation, route }: Props) => {
  // Extraemos el product de las props del navigator:
  const { product } = route.params;
  //Obteniendo el total de la pantalla:
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  // Accedemos a las funciones y variables del ViewModel:
  const { productImageList } = useViewModel(product);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          width={width}
          height={height} // Ajustando la altura del elemento
          autoPlay={true}
          data={productImageList}
          scrollAnimationDuration={5000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.productImage} />
          )}
        />
      </GestureHandlerRootView>

      <View style={styles.productDetail}>
        <View style={styles.productInfo}>
          {/* NOMBRE */}
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.divider}></View>
          {/* DESCRIPCIÓN */}
          <Text style={styles.descriptionTitle}>Descripción: </Text>
          <Text style={styles.descriptionContent}>{product.description}</Text>
          <View style={styles.divider}></View>

          {/* PRECIO */}
          <Text style={styles.descriptionTitle}>Precio: </Text>
          <Text style={styles.descriptionContent}>${product.price}</Text>
          <View style={styles.divider}></View>

          {/* ORDEN */}
          <Text style={styles.descriptionTitle}>Tu orden: </Text>
          <Text style={styles.descriptionContent}>Cantidad:</Text>
          <Text style={styles.descriptionContent}>Precio c/u:</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity style={styles.actionLess}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.actionText}>0</Text>
          </View>
          <TouchableOpacity style={styles.actionAdd}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>

          <View style={styles.buttonAdd}>
            <RoundedButton text="AGREGAR" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};
