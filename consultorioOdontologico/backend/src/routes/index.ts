import { Router } from "express";
import turnoRoutes from "./turno.route";
import doctorRoutes from "./doctor.route";

import pacienteRoutes from './paciente.route';

const router = Router();

router.use('/turnos', turnoRoutes);
router.use('/doctores', doctorRoutes);
router.use('/pacientes', pacienteRoutes);

export default router;