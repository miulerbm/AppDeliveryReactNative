import React, { useEffect } from "react";
import { Image, Text, ToastAndroid, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import stylesMap from "./StylesMap";

export const ClientAddressMapScreen = () => {
  const { messagePermissions, position, mapRef } = useViewModel();

  useEffect(() => {
    if (messagePermissions != "") {
      ToastAndroid.show(messagePermissions, ToastAndroid.LONG);
    }
  }, [messagePermissions]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={stylesMap}
        style={{ height: "100%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
      />

      <Image
        style={styles.imageLocation}
        source={require("../../../../../../assets/location_home.png")}
      />

      <View style={styles.refPoint}>
        <Text style={styles.refPointText}>Punto de referencia</Text>
      </View>

      <View style={styles.buttonRefPoint}>
        <RoundedButton text="SELECCIONAR PUNTO" onPress={() => {}} />
      </View>
    </View>
  );
};
