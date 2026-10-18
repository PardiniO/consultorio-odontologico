import { Router } from "express";
import * as doctorController from "../controller/doctor.controller";
import verificarToken from "../middleware/verificarToken.middleware";

const router = Router();

router.get('/', verificarToken,doctorController.getAll);
router.get('/:id',verificarToken, doctorController.getById);
router.get('/by-names/:nombre',verificarToken, doctorController.getByName);
router.post('/',verificarToken, doctorController.create);
router.put('/:id',verificarToken, doctorController.update);
router.delete('/:id',verificarToken, doctorController.remove);

export default router;