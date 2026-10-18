import { Router } from "express";
import * as turnoController from "../controller/turno.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import esAdmin from "../middleware/esAdmin.middleware";

const router = Router();

router.get('/',verificarToken, turnoController.getAll);
router.get('/:id', verificarToken, turnoController.getById);
router.post('/', turnoController.create);
router.put('/:id',verificarToken, esAdmin, turnoController.update);
router.delete('/:id',verificarToken, esAdmin, turnoController.remove);

export default router;