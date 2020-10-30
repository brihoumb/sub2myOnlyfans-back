import { Router } from 'express';
import { save, load } from '../api/memoryCard';
import verification from '../middleware/verifyAuth';

const memoryCardRouter = Router();

memoryCardRouter.post('/save', verification, save);
memoryCardRouter.get('/load', verification, load);

export default memoryCardRouter;
