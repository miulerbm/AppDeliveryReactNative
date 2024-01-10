import { User } from "../entities/User";

export interface UserLocalRepository {
  // Esto para que se almacene el usuario en sesión:
  save(user: User): Promise<void>;
  // Método para obtener el user:
  getUser(): Promise<User>;
}
