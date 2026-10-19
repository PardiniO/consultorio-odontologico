import { Router } from "express";
import * as doctorController from "../controller/doctor.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import esAdmin from "../middleware/esAdmin.middleware";

const router = Router();

router.get('/',             verificarToken, esAdmin, doctorController.getAll);
router.get('/:id',          verificarToken, esAdmin, doctorController.getById);
router.get('/by-user/:user',verificarToken, esAdmin, doctorController.getByUser);
router.post('/',            verificarToken, esAdmin, doctorController.create);
router.put('/:id',          verificarToken, esAdmin, doctorController.update);
router.delete('/:id',       verificarToken, esAdmin, doctorController.remove);

export default router;