import { Router } from "express";
import * as doctorController from "../controller/doctor.controller";
import { esAdmin, authGuard } from "../middleware/auth.middleware";

const router = Router();

router.get('/', authGuard, esAdmin, doctorController.getAll);
router.get('/filters', authGuard, esAdmin, doctorController.getWithFilters);
router.get('/by-user/:user', authGuard, esAdmin, doctorController.getByUser);
router.get('/:id', authGuard, esAdmin, doctorController.getById);
router.post('/', authGuard, esAdmin, doctorController.create);
router.put('/:id', authGuard, esAdmin, doctorController.update);
router.delete('/:id', authGuard, esAdmin, doctorController.remove);

export default router;