import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Styles";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImages";
import { ScrollView } from "react-native";

// Vamos a extraer la categoría que teníamos en los params de la pantalla padre (ProductList):
interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductCreateScreen"> {}

export const AdminProductCreateScreen = ({ navigation, route }: Props) => {
  // En una constante guardamos el valor de la category (es un objeto que trae varias cosas.)
  const { category } = route.params;
  const {
    name,
    description,
    responseMessage,
    loading,
    image1,
    image2,
    image3,
    price,
    onChange,
    takePhoto,
    pickImage,
    createProduct,
  } = useViewModel(category);

  const [modalVisible, setModalVisible] = useState(false);
  // Nuevo useState para trabajar con el número de la imagen:
  const [numberImage, setNumberImage] = useState(1);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            // Al presionar este touchable, establecemos que el número de la imagen es 1
            setNumberImage(1);
            setModalVisible(true);
          }}
        >
          {image1 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image source={{ uri: image1 }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(2);
            setModalVisible(true);
          }}
        >
          {image2 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image source={{ uri: image2 }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNumberImage(3);
            setModalVisible(true);
          }}
        >
          {image3 == "" ? (
            <Image
              style={styles.image}
              source={require("../../../../../../assets/image_new.png")}
            />
          ) : (
            <Image source={{ uri: image3 }} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/menu.png")}
            />
            <Text style={styles.textCategory}>Categoría Seleccionada: </Text>
            <Text>{category.name}</Text>
          </View>
          <CustomTextInput
            placeholder="Nombre de del producto"
            image={require("../../../../../../assets/categories.png")}
            keyboardType="default"
            value={name}
            onChangeText={onChange}
            property="name"
          />
          <CustomTextInput
            placeholder="Descripción"
            image={require("../../../../../../assets/description.png")}
            keyboardType="default"
            value={description}
            onChangeText={onChange}
            property="description"
          />
          <CustomTextInput
            placeholder="Precio"
            image={require("../../../../../../assets/price.png")}
            keyboardType="numeric"
            value={price}
            onChangeText={onChange}
            property="price"
          />
          <View style={styles.buttonContainer}>
            <RoundedButton
              text="CREAR PRODUCTO"
              onPress={() => createProduct()}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickMultipleImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
        numberImage={numberImage}
      />

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
