import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from "react";
// Importamos los casos de uso:
import { GetAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory";
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/DeleteCategory";

// Definimos las propiedades que se van a recibir:
export interface CategoryContextProps {
  categories: Category[];
  // Definimos los métodos CRUD de categorías:
  getCategories(): Promise<void>;

  create(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;

  update(category: Category): Promise<ResponseApiDelivery>;
  updateWithImage(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;

  remove(id: string): Promise<ResponseApiDelivery>;
}

// Definimos nuestro contexto:

export const CategoryContext = createContext({} as CategoryContextProps);

// Exportamos el provider donde se implementan los métodos:

export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Cada vez que invoquemos el context, nos traerá las categorías.
  useEffect(() => {
    if (categories.length === 0) {
      // Si no se han cargado las categorías del backend, llamamos al método para traerlas.
      getCategories();
    }
  }, []);

  const getCategories = async (): Promise<void> => {
    const result = await GetAllCategoryUseCase();
    setCategories(result);
  };
  const create = async (
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> => {
    const response = await CreateCategoryUseCase(category, file!);
    getCategories();
    return response;
  };
  // Creamos los métodos para actualizar categorías:
  const update = async (category: Category): Promise<ResponseApiDelivery> => {
    const response = await UpdateCategoryUseCase(category);
    // Una vez hecho el update, llamamos a getCategories, para volver a traer los datos y que se vean en el screen respectivo.
    getCategories();
    return response;
  };
  const updateWithImage = async (
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> => {
    const response = await UpdateWithImageCategoryUseCase(category, file);
    getCategories();
    return response;
  };
  // Método DELETE category
  const remove = async (id: string): Promise<ResponseApiDelivery> => {
    const response = await DeleteCategoryUseCase(id);
    getCategories();
    return response;
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        create,
        update,
        updateWithImage,
        remove,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
