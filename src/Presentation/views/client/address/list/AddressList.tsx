import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import useViewModel from "./ViewModel";

export const ClientAddressListScreen = () => {
  const { address, getAddress } = useViewModel();

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={address}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <Text>{item.address}</Text>}
      />
    </View>
  );
};
