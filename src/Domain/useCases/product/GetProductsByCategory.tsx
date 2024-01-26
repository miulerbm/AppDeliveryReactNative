import React from "react";
import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const { getProductsByCategory } = new ProductRepositoryImpl();

export const GetProductsByCategoryUseCase = async (id_category: string) => {
  return await getProductsByCategory(id_category);
};
