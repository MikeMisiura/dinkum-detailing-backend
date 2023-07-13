import { Router } from 'express';
import { loginUser, createUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);

export default router;