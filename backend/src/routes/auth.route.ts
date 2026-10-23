import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { authGuard, esAdmin } from "../middleware/auth.middleware";


const router = Router();

router.post('/registrar', authGuard, esAdmin, authController.register);
router.post('/login', authController.login);

export default router;