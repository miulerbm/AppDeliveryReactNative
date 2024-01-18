import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import useViewModel from "./ViewModel";

export const AdminCategoryListScreen = () => {
  const { categories, getCategories } = useViewModel();
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};
