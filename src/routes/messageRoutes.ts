import { Router } from 'express';
import { createMessage } from '../controllers/messageController';

const router = Router();

router.post('/', createMessage);

export default router;