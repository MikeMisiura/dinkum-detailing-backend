import { Router } from 'express';
import { loginUser } from '../controllers/userController';

const router = Router();

router.post('/', loginUser);

export default router;