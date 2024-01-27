import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";

const AdminProductListViewModel = () => {
  // Extraemos los métodos y estados necesarios para manejar los datos
  // en las pantallas que tienen relación con la entidad product
  const { products, getProducts, remove } = useContext(ProductContext);

  // Creamos un useState para saber el mensaje del backend durante el deleteProduct:
  const [responseMessage, setResponseMessage] = useState("");

  // Crearemos un método para eliminar producto
  const deleteProduct = async (product: Product) => {
    const result = await remove(product);
    setResponseMessage(result.message);
  };

  return {
    products,
    responseMessage,
    getProducts,
    deleteProduct,
  };
};

export default AdminProductListViewModel;
