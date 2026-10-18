import { Router } from "express";
import * as pacienteController from "../controller/paciente.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import esAdmin from "../middleware/esAdmin.middleware";

const router = Router();

router.get('/', verificarToken, esAdmin, pacienteController.getAll);
router.get('/:id', verificarToken, esAdmin,  pacienteController.getById);
router.post('/', verificarToken, esAdmin,  pacienteController.create);
router.put('/:id', verificarToken, esAdmin,  pacienteController.update);
router.delete('/:id', verificarToken, esAdmin,  pacienteController.remove);

export default router;