// Este archivo intercepta errores y responde con un mensaje claro en formato JSON

import type { Request, Response, NextFunction } from "express";
// Se importan los tipos de Express para tipar correctamente las funciones de middleware

export function notFound(req: Request, res: Response) {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    });

    // Middleware para rutas inexistentes, si el usuario pide una URL que no está definida en resourceLimits, responde con 404 Not Found y un mensaje claro
}

export function errorHandler(
    err: unknown, _req: Request, res: Response, _next: NextFunction
) {
    console.error(err);
    res.status(500).json({error: 'Error interno del servidor'});

    // Middleware de errores generales, tiene 4 parámetros, err, req, res, next, Express los reconoce como handler de errores. Si ocurre cualquier excepción en un controller async, Express 5 la pasa automáticamente acá, responde con: 500 Internal Server Error, un mensaje genérico y el error en consola para debug
}