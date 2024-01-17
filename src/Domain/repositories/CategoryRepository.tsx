import { ImagePickerAsset } from "expo-image-picker";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Category } from "../entities/Category";

export interface CategoryRepository {
  create(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery>;
}
