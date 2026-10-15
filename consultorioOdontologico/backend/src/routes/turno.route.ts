import { Router } from "express";
import * as turnoController from "../controller/turno.controller";

const router = Router();

router.get('/', turnoController.getAll);
router.get('/:id', turnoController.getById);
router.post('/', turnoController.create);
router.put('/:id', turnoController.update);
router.delete('/:id', turnoController.remove);

export default router;