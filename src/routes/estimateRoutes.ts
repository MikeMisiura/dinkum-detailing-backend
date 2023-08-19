import { Router } from 'express';
import { createEstimate } from '../controllers/estimateController';

const router = Router();

router.post('/', createEstimate);

export default router;