import { Request } from "express";
import { UsuarioI } from "./usuario.interface";

export interface AuthRequest extends Request {
    user?: Pick<UsuarioI, 'id' | 'username' | 'nombre' | 'apellido'>;
}