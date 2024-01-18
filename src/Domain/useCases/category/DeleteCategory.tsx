import React from "react";
import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRespository";
import { Category } from "../../entities/Category";
import { ImagePickerAsset } from "expo-image-picker";
const { remove } = new CategoryRepositoryImpl();

export const DeleteCategoryUseCase = async (id: string) => {
  return await remove(id);
};
