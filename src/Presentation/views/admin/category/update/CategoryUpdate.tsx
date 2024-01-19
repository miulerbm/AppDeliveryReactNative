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
import { RootStackParamList } from "../../../../../../App";

interface Props
  extends StackScreenProps<RootStackParamList, "AdminCategoryUpdateScreen"> {}

export const AdminCategoryUpdateScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const {
    name,
    description,
    responseMessage,
    loading,
    image,
    onChange,
    takePhoto,
    pickImage,
    updateCategory,
  } = useViewModel(category);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.imageContainer}
      >
        {image == "" ? (
          <Image
            style={styles.image}
            source={require("../../../../../../assets/image_new.png")}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la categoría"
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
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton
          text="ACTUALIZAR CATEGORÍA"
          onPress={() => updateCategory()}
        />
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
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
