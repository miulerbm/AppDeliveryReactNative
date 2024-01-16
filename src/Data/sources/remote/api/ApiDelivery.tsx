// Vamos a utilizar axios para hacer las peticiones HTTP al backend
import axios from "axios";
import { LocalStorage } from "../../local/LocalStorage";
import { User } from "../../../../Domain/entities/User";

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

//  INTERCEPTORS
// Funcionan como middlewares, una capa intermedia entre la petición y el backend
ApiDelivery.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data as any);
    config.headers!["Authorization"] = user.session_token!;
  }
  return config;
});

ApiDeliveryForImage.interceptors.request.use(async (config) => {
  const data = await LocalStorage().getItem("user");
  if (data) {
    const user: User = JSON.parse(data as any);
    config.headers!["Authorization"] = user.session_token!;
  }
  return config;
});

export { ApiDelivery, ApiDeliveryForImage };
