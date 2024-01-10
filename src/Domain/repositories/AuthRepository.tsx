import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";

export interface AuthRepository {
  // La definición de los repositorios: Los métodos que vamos a utilizar y que deben definirse en:
  // src\Data\repositories\AuthRepository.tsx en Data.
  // Definimos el método login
  login(email: string, password: string): Promise<ResponseApiDelivery>;
  register(user: User): Promise<ResponseApiDelivery>;
}
