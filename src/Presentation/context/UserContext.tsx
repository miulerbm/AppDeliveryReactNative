import React, { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import { SaveUserLocalUseCase } from "../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../Domain/useCases/userLocal/GetUserLocal";
import { RemoveUserLocalUseCase } from "../../Domain/useCases/userLocal/RemoveUserLocal";

export const userInitialState: User = {
  id: "",
  name: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  confirmpassword: "",
  image: "",
  session_token: "",
  roles: [],
};

export interface UserContextProps {
  user: User;
  saveUserSession: (user: User) => Promise<void>;
  getUserSession: () => Promise<void>;
  removeUserSession: () => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {
  // Establecemos los nuevos datos a nuestro usuario:
  const [user, setUser] = useState(userInitialState);

  // Necesitamos el useEffect para que en el momento de llamar el context, traiga la info del usuario:
  useEffect(() => {
    getUserSession();
  }, []);

  // Método para almacenar el usuario en sesión:
  const saveUserSession = async (user: User) => {
    await SaveUserLocalUseCase(user);
    setUser(user);
  };

  // Método para obtener la sesión del usuario:
  const getUserSession = async () => {
    const user = await GetUserLocalUseCase();
    setUser(user);
  };

  const removeUserSession = async () => {
    await RemoveUserLocalUseCase();
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserSession,
        getUserSession,
        removeUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
