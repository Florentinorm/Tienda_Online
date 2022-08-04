export interface User {
    id_usuario: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    password: string;
    idUsuario: number;
  }
  
  export interface UserResponse {
    message: string;
    token: string;
    code: number;
    idRol: number;
    userId: string;
  }
  
  