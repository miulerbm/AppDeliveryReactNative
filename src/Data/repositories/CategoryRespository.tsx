import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../../Domain/entities/Category";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import mime from "mime";
import { AxiosError } from "axios";

export class CategoryRepositoryImpl implements CategoryRepository {
  async create(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
    try {
      let data = new FormData();
      // @ts-ignore
      data.append("image", {
        uri: file.uri,
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri)!,
      });
      data.append("category", JSON.stringify(category));
      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/categories/create",
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
}
