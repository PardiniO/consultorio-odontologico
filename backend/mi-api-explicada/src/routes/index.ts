// Este archivo centraliza las rutas de cada entidad (productos, clientes, etc) y exponerlas bajo un perfil común

import { Router } from "express";
// Se importa el Router de Express para crear un conjunto de rutas
import productoRoutes from './producto.routes';
// Se trae el archivo producto.routes.ts que contiene las rutas específicas del CRUD de productos

const router = Router();
// Se crea una instancia Router, que funciona como un mini-servidor dentro de Express

router.use('/productos', productoRoutes);
// Todas las rutas definidas en producto.routes.ts se montan bajo el prefijo /productos

export default router;
// Se exporta el router para que pueda ser usado en app.ts