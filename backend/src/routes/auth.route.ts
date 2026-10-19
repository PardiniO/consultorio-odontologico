import { Router } from "express";
import * as authController from "../controller/auth.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import esAdmin from "../middleware/esAdmin.middleware";

const router = Router();

router.post('/registrar', verificarToken, esAdmin, authController.registrar);
router.post('/login', authController.login);

export default router;