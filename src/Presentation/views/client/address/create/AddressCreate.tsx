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
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressCreateScreen"> {}

export const ClientAddressCreateScreen = ({ navigation, route }: Props) => {
  const {
    address,
    neighborhood,
    refPoint,
    responseMessage,
    loading,
    onChange,
    onChangeRefPoint,
    createAddress,
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  // Con un useEffect escuchamos los cambios en el refpoint y volvemos a establecer su valor
  useEffect(() => {
    if (route.params?.refPoint) {
      onChangeRefPoint(
        route.params?.refPoint,
        route.params?.latitude,
        route.params?.longitude
      );
    }
  }, [route.params?.refPoint]);

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
        <Image
          style={styles.image}
          source={require("../../../../../../assets/map.png")}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la Dirección"
          image={require("../../../../../../assets/location.png")}
          keyboardType="default"
          value={address}
          onChangeText={onChange}
          property="address"
        />
        <CustomTextInput
          placeholder="Barrio"
          image={require("../../../../../../assets/neighborhood.png")}
          keyboardType="default"
          value={neighborhood}
          onChangeText={onChange}
          property="neighborhood"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ClientAddressMapScreen")}
        >
          <CustomTextInput
            placeholder="Punto de referencia"
            image={require("../../../../../../assets/ref_point.png")}
            keyboardType="default"
            value={refPoint}
            onChangeText={onChange}
            property="refPoint"
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton text="CREAR DIRECCIÓN" onPress={() => createAddress()} />
      </View>

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
