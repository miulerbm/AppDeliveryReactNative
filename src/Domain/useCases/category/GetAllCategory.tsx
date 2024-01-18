import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRespository";

const { getAll } = new CategoryRepositoryImpl();

export const GetAllCategoryUseCase = async () => {
  return await getAll();
};
