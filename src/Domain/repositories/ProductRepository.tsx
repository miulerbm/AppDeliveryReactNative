// En el Repository definimos los métodos que vamos a utilizar.

import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../entities/Product";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";

export interface ProductRepository {
  create(
    // Aquí se define del método create, sus entradas y salidas.
    // En la carpeta Data, se implementan los detalles técnicos.
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
  // Método para obtener products por category:
  getProductsByCategory(id_category: string): Promise<Product[]>;
  update(product: Product): Promise<ResponseApiDelivery>;
  updateWithImage(
    product: Product,
    files: ImagePickerAsset[]
  ): Promise<ResponseApiDelivery>;
  // método DELETE, se llamará "remove":
  remove(product: Product): Promise<ResponseApiDelivery>;
}
