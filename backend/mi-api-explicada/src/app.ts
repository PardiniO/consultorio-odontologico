// Acá se arma la aplicación Express sin levantarla todavía, es el cerebro que junta todas las piezas vistas, configura la aplicación Express (middlewares, rutas, manejadores de error), pero no inicia el servidor. Esto permite reutilizar app en tests o en server.ts

import express from 'express';
import routes from './routes';
import { notFound, errorHandler } from './middlewares/error.middleware';

// Se importa Express, se traen las rutas agrupadas (routes/index.ts) y se importan los middlewares de error (notFound y errorHandler)

const app = express();
// Se crea la aplicación Express

app.use(express.json());
// Middleware que convierte automáticamente el cuerpo de las peticiones con "Content-Type: application/json" en un objeto JS (req.body), sin esto, no se pueden leer datos enviados en un POST o PUT

app.get('/health', (_req, res) => {
    res.json({status: 'ok'});
});
// Ruta de health check, sirve para verificar que el servidor está vivo, si accedo a "http://localhost:3000/health", devuelve {"status": "ok"}

app.use('/api', routes);
// Monta todas las rutas de la API bajo el prefijo /api

app.use(notFound);
app.use(errorHandler);
// Orden importante: Primero las rutas, después los middlewares de error, notFound captura cualquier ruta no definida y errorHandler captura errores inesperados

export default app;
// Se exporta la aplicación para que server.ts la use y la levante