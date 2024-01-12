// Vamos a utilizar axios para hacer las peticiones HTTP al backend
import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: "http://192.168.1.7:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});

// Para mandar la data:
const ApiDeliveryForImage = axios.create({
  baseURL: "http://192.168.1.7:3000/api",
  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
});

export { ApiDelivery, ApiDeliveryForImage };
