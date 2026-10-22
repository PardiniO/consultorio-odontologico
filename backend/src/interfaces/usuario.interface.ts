export type Role = "user" | "admin";

export interface IUsuario {
    id?: number,
    nombre?: string | null,
    apellido?: string | null,
    contraseña: string,
    rol: Role
}