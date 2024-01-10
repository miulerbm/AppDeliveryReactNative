import React, { useEffect, useState } from "react";
import { GetUserLocalUseCase } from "../../Domain/useCases/userLocal/GetUserLocal";
import { User } from "../../Domain/entities/User";

export const useUserLocal = () => {
  const [user, setUser] = useState<User>();

  // Llamamos a un useEffect para obtener la información del usuario
  // Esto se va a ejecutar cuando instanciemos el VM en la pantalla Home
  useEffect(() => {
    getUserSession();
  }, []);

  const getUserSession = async () => {
    const user = await GetUserLocalUseCase();
    setUser(user);
  };

  return {
    user,
    getUserSession,
  };
};
