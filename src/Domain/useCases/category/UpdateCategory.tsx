import React from "react";
import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRespository";
import { Category } from "../../entities/Category";
import { ImagePickerAsset } from "expo-image-picker";
const { update } = new CategoryRepositoryImpl();

export const UpdateCategoryUseCase = async (category: Category) => {
  return await update(category);
};
