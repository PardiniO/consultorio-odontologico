import { Router } from "express";
import * as doctorController from "../controller/doctor.controller";

const router = Router();

router.get('/', doctorController.getAll);
router.get('/:id', doctorController.getById);
router.get('/by-names/:nombre', doctorController.getByName);
router.post('/', doctorController.create);
router.put('/:id', doctorController.update);
router.delete('/:id', doctorController.remove);

export default router;