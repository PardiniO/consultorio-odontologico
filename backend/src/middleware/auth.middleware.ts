import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayLoad } from "../interfaces/tokenPayLoad.interface";
import { AuthRequest } from "../interfaces/authRequest.interface";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

// La interface "Request" por defecto no trae la propiedad "usuario", asi que declaro un tipado que tome como base a "Request" y utilizo ese
type RequestConUsuario = Request & {
  usuario?: {
    id: number;
    rol: string;
    esAdmin: number;
  };
};

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se ha proporcionado ningún token' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayLoad;
        req.user = {
            id: payload.id,
            username: payload.username
        };
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
}

export function esAdmin(req: RequestConUsuario , res: Response, next: NextFunction) {
  if (!req.usuario || req.usuario.esAdmin === 0) {
    return res.status(403).json({ error: 'No tenés permiso para hacer esto' });
  }
  next();
}