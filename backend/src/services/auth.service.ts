import jwt, { type SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { UsuarioI, type UsuarioInput } from "../interfaces/usuario.interface";
import { UsuarioService } from "./usuario.service";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn'];

export const AuthService = {
    async register(data: UsuarioI): Promise<Omit<UsuarioI, 'contrasena'>> {
        const user = await UsuarioService.register(data);
        return user;
    },

    async login(username: string, contrasena: string): Promise<{ 
        token: string;
        user: Omit<UsuarioI, 'contrasena'> } & 
        { esAdmin: boolean }> {
        const user = await UsuarioService.authenticate(username, contrasena);
        if (!user) throw new Error("Usuario no encontrado");
        
        const token = jwt.sign(
                { id: user.id, username: user.username, esAdmin: user.esAdmin },                
                JWT_SECRET, { expiresIn: JWT_EXPIRES_IN 
            });
        return { token, user, esAdmin: user.esAdmin };
    }
}