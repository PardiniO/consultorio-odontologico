import { Router } from "express";
import * as authController from "../controller/auth.controller";
import verificarToken from "../middleware/verificarToken.middleware";
import esAdmin from "../middleware/esAdmin.middleware";

const router = Router();

router.post('/registrar-doctor', verificarToken, esAdmin, authController.registrarDoctor);
router.post('/login-doctor', authController.loginDoctor);
router.post('/registrar-paciente', verificarToken, esAdmin, authController.registrarPaciente);
router.post('/login-paciente', authController.loginPaciente);

export default router;