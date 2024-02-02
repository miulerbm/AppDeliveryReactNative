import { Product } from "../../Domain/entities/Product";
import { createContext, useEffect, useState } from "react";
import { GetShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/GetShoppingBag";
import { SaveShoppingBagUseCase } from "../../Domain/useCases/shoppingBag/SaveShoppingBag";

export interface ShoppingBagContextProps {
  shoppingBag: Product[]; // Es nuestra lista de productos
  total: number;
  getShoppingBag(): Promise<void>;
  getTotal(): Promise<void>;
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
  const [total, setTotal] = useState(0.0);

  // Con un useEffect actualizamos la lista cada que se añada un dato, o cuando llamemos al context:
  useEffect(() => {
    getShoppingBag();
  }, []);

  // Vamos a crear un useEffect para escuchar cuando el valor a pagar cambie
  // y así, llamamos a la función quen retorna el precio total:
  useEffect(() => {
    getTotal();
  }, [shoppingBag]);

  const getShoppingBag = async (): Promise<void> => {
    const result = await GetShoppingBagUseCase();
    setShoppingBag(result);
  };

  // Método para obtener el total a pagar:
  const getTotal = async (): Promise<void> => {
    setTotal(0);
    let totalPrice = 0;
    shoppingBag.forEach((product) => {
      // Por cada producto en el carro de compras, se añade el precio a pagar (según cantidad):
      totalPrice = totalPrice + product.quantity! * product.price;
    });
    setTotal(totalPrice);
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
    shoppingBag.splice(index, 1);
    await SaveShoppingBagUseCase(shoppingBag);
    getShoppingBag();
  };

  return (
    <ShoppingBagContext.Provider
      value={{
        shoppingBag,
        total,
        getShoppingBag,
        getTotal,
        saveItem,
        deleteItem,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
