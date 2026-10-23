import { Router } from "express";
import * as authController from "../controller/auth.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import { authGuard, esAdmin } from "../middleware/auth.middleware";


const router = Router();

router.post('/registrar', verificarToken, esAdmin, authController.register);
router.post('/login', authGuard, authController.login);

export default router;