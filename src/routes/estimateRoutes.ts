import { Router } from 'express';
import { createEstimate, deleteEstimate, getAllEstimates, getOneEstimate } from '../controllers/estimateController';

const router = Router();

router.get('/', getAllEstimates);

router.post('/', createEstimate);

router.get('/:estimateId', getOneEstimate);

router.delete('/:estimateId', deleteEstimate);

export default router;