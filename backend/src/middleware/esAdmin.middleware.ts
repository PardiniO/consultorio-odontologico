import { Request, Response, NextFunction } from 'express';

// La interface "Request" por defecto no trae la propiedad "usuario", asi que declaro un tipado que tome como base a "Request" y utilizo ese
type RequestConUsuario = Request & {
  usuario?: {
    id: number;
    rol: string;
    esAdmin: boolean;
  };
};

function esAdmin(req: RequestConUsuario , res: Response, next: NextFunction) {
  if (!req.usuario || req.usuario.esAdmin === false) {
    return res.status(403).json({ error: 'No tenés permiso para hacer esto' });
  }
  next();
}

export default esAdmin;