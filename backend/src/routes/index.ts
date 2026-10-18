import { Router } from "express";
import authRoutes from "./auth.route";
import turnoRoutes from "./turno.route";
import doctorRoutes from "./doctor.route";

import pacienteRoutes from './paciente.route';

const router = Router();

router.use('/turnos', turnoRoutes);
router.use('/doctores', doctorRoutes);
router.use('/doctores', authRoutes);
router.use('/pacientes', pacienteRoutes);
router.use('/pacientes', authRoutes);
export default router;