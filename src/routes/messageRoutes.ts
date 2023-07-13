import { Router } from 'express';
import { getAllMessages, createMessage, getOneMessage, editMessage, deleteMessage } from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);

router.post('/', createMessage);

router.get('/:messageId', getOneMessage);

router.put('/:messageId', editMessage);

router.delete('/:messageId', deleteMessage);

export default router;