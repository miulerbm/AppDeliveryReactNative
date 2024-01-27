import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import mime from "mime";
import {
  ApiDeliveryForImage,
  ApiDelivery,
} from "../sources/remote/api/ApiDelivery";

// En los repositories de la carpeta Data, se implementa el código de cada método definido en el Domain
// No te olvides de exportar la calse para usarla en los UseCases
export class ProductRepositoryImpl implements ProductRepository {
  async getProductsByCategory(id_category: string): Promise<Product[]> {
    try {
      // Implementando el método getProductsByCategory
      const response = await ApiDelivery.get<Product[]>(
        `/products/findByCategory/${id_category}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve([]);
    }
  }

  async create(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();

      // Se crea un for each, que recorra files y maneje la subida de las 3 imágenes
      files.forEach((file) => {
        // Recorremos los archivos (3) y le colocamos las imágenes respectivas.
        // @ts-ignore
        data.append("image", {
          uri: file.uri,
          name: file.uri.split("/").pop(),
          type: mime.getType(file.uri)!,
        });
      });

      data.append("product", JSON.stringify(product));
      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        // Pasamos la ruta del backend
        "/products/create",
        data
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async remove(product: Product): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(
        `/products/delete/${product.id}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
