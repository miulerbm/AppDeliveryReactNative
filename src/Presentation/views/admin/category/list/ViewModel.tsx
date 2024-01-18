import React, { useState } from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { GetAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory";

const AdminCategoryListViewModel = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const result = await GetAllCategoryUseCase();
    console.log("CATEGORIES: " + JSON.stringify(result));
    setCategories(result);
  };

  return {
    categories,
    getCategories,
  };
};

export default AdminCategoryListViewModel;
