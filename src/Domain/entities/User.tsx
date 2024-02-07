// Vamos a crear la clase usuario.
// Herramienta: app quicktype io

import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
  id?: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  confirmpassword: string;
  image?: string;
  session_token?: string;
  roles?: Rol[];
  // Adding address field:
  address?: Address;
}
