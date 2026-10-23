import { Router } from "express";
import * as pacienteController from "../controller/paciente.controller";
import { authGuard, esAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get('/'      , authGuard, esAdmin, pacienteController.getAll);
router.get('/filters', authGuard, esAdmin, pacienteController.getWithFilters)
router.get('/:id'   , authGuard, esAdmin,  pacienteController.getById);
router.post('/'     , pacienteController.create);
router.put('/:id'   , authGuard, esAdmin,  pacienteController.update);
router.delete('/:id', authGuard, esAdmin,  pacienteController.remove);

export default router;