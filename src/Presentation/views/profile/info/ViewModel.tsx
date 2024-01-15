import React from "react";
import { RemoveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/RemoveUserLocal";
import { useUserLocal } from "../../../hooks/useUserLocal";

export const ProfileInfoViewModel = () => {
  // Traemos un usuario con el custom Hook:
  const { user } = useUserLocal();

  // Método para remover la sesión:
  const removeSession = async () => {
    await RemoveUserLocalUseCase();
  };

  return { removeSession, user };
};

export default ProfileInfoViewModel;
