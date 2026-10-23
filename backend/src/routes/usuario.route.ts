import { Router } from 'express';
import {
    getUsers,
    getUsersById,
    createUser,
    removeUser
} from '../controller/usuario.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUser);
router.delete('/:id', removeUser);

export default router;