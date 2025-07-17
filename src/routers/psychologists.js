import { Router } from 'express';
import {
  getPsychologistByIdController,
  getPsychologistsController,
  postPsychologistController,
} from '../controllers/psychologist.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidObjectId } from '../utils/isValidObjectId.js';

const router = Router();

router.get('/psychologists', ctrlWrapper(getPsychologistsController));

router.get(
  '/psychologists/:id',
  isValidObjectId('id'),
  ctrlWrapper(getPsychologistByIdController),
);

router.post('/psychologists', ctrlWrapper(postPsychologistController));

export default router;
