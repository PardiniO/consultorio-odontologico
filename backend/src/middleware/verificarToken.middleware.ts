const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

// La interface "Request" por defecto no trae la propiedad "usuario", asi que declaro un tipado que tome como base a "Request" y utilizo ese
type RequestConUsuario = Request & {
  usuario?: {
    id: number;
    rol: string;
    esAdmin: boolean;
  };
};

function verificarToken(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction,
) {
  const cabecera = req.headers['authorization'];
  if (!cabecera || !cabecera.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta el token' });
  }

  const token = cabecera.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o vencido' });
  }
}

export default verificarToken;
