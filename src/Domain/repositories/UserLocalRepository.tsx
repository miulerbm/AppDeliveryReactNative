import { User } from "../entities/User";
// En esta parte definimos que acciones queremos hacer.
export interface UserLocalRepository {
  // Esto para que se almacene el usuario en sesión:
  save(user: User): Promise<void>;
  // Método para obtener el user:
  getUser(): Promise<User>;
  // Método para cerrar sesión del user.
  remove(): Promise<void>;
}
