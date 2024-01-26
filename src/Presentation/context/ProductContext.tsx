import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext } from "react";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";

export interface ProductContextProps {
  create(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const create = async (
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery> => {
    const response = await CreateProductUseCase(product, files);
    return response;
  };

  return (
    <ProductContext.Provider
      value={{
        create,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
