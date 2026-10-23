import { Router } from 'express';
import * as turnoController from '../controller/turno.controller';
import verificarToken from '../middleware/verificarToken.middleware';
import  { authGuard, esAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authGuard, esAdmin, turnoController.getAll);
router.get(
    '/filters',
    authGuard, 
    esAdmin,
    turnoController.getWithFilters,
);
router.get('/:id', authGuard, esAdmin, turnoController.getById);
router.post('/', turnoController.create);
router.put('/:id', authGuard, esAdmin, turnoController.update);
router.delete('/:id', authGuard, esAdmin, turnoController.remove);

export default router;
