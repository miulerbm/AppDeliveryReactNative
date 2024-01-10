// Vamos a crear la clase usuario.
// Herramienta: app quicktype io

export interface User {
  id?: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  confirmpassword: string;
  session_token?: string;
}
