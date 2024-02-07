import React, { useState, useContext } from "react";
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress";
import { Address } from "../../../../../Domain/entities/Address";
import { UserContext } from "../../../../context/UserContext";

const ClientAddressListViewModel = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const { user } = useContext(UserContext);

  const [checked, setChecked] = useState("");

  const changeRadioValue = (idAddress: string) => {
    setChecked(idAddress);
  };

  const getAddress = async () => {
    // Con esto traemos las direcciones:
    const result = await GetByUserAddressUseCase(user.id!);
    // Establecemos los result como valores de nuestro estado address:
    setAddress(result);
  };

  return {
    address,
    checked,
    getAddress,
    changeRadioValue,
  };
};

export default ClientAddressListViewModel;
