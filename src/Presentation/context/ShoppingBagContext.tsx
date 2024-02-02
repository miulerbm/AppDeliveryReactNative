import { Product } from "../../Domain/entities/Product";
import { createContext, useEffect, useState } from "react";
import { GetShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/GetShoppingBag";
import { SaveShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/SaveShoppingBag";

export interface ShoppingBagContextProps {
  shoppingBag: Product[]; // Es nuestra lista de productos
  getShoppingBag(): Promise<void>;
  //método para agregar un elemento a la bolsa de compras:
  saveItem(product: Product): Promise<void>;
  deleteItem(product: Product): Promise<void>;
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export const ShoppingBagProvider = ({ children }: any) => {
  // Los providers reciben un children que serán las pantallas hijas en las que se propagará la información
  // definida en este contexto

  // Definimos un estado llamado "Bolsa de compras"
  const [shoppingBag, setShoppingBag] = useState<Product[]>([]);

  // Con un useEffect actualizamos la lista cada que se añada un dato, o cuando llamemos al context:
  useEffect(() => {
    getShoppingBag();
  }, []);

  const getShoppingBag = async (): Promise<void> => {
    const result = await GetShoppingBagUseCase();
    setShoppingBag(result);
  };

  const saveItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    if (index == -1) {
      // PRODUCTO NO HA SIDO AGREGADO A LA BOLSA DE COMPRAS -> INSERTARLO A LA LISTA
      shoppingBag.push(product);
    } else {
      // El producto YA HA SIDO AGREGADO A LA BOLSA DE COMPRAS -> EDITAR LA CANTIDAD SELECCIONADA
      shoppingBag[index].quantity = product.quantity;
    }
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppingBag();
  };

  const deleteItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id == product.id);
    shoppingBag.splice(index);
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppingBag();
  };

  return (
    <ShoppingBagContext.Provider
      value={{
        shoppingBag,
        getShoppingBag,
        saveItem,
        deleteItem,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
