import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { Product } from "../../entities/Product";
import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";

// Extraemos cosas del ProductRepositoryImpl
const { create } = new ProductRepositoryImpl();

// Este caso de uso recibe un producto de tipo Product y un imageAsset
export const CreateProductUseCase = async (
  product: Product,
  files: ImagePickerAsset[]
) => {
  return await create(product, files);
};
