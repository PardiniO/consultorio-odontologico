// Este archivo asocia cada URL + Método HTTP con el controller correspondiente

import { Router } from "express";
// Se importa el Router de Express para crear un conjunto de rutas
import * as productoController from '../controllers/producto.controller';
// Se importan todos los métodos del controller

const router = Router();
// Se crea el Router

router.get('/', productoController.getAll);
router.get('/:id', productoController.getById);
router.post('/', productoController.create);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.remove);

// Se definen las rutas del CRUD

export default router;
// Se exporta el router para que pueda ser usado en routes/index.ts