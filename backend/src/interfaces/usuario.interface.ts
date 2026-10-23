import { RowDataPacket } from "mysql2";

export interface UsuarioI {
    id?: number,
    nombre?: string,
    apellido?: string,
    username?: string,
    contrasena: string,
}

export interface UsuarioRow extends RowDataPacket, UsuarioI {}

export type UsuarioInput = Omit<UsuarioI, 'id'>;