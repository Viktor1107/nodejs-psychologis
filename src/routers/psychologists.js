import { Router } from 'express';
import {
  deletePsychologistController,
  getPsychologistByIdController,
  getPsychologistsController,
  patchPsychologistController,
  postPsychologistController,
} from '../controllers/psychologist.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidObjectId } from '../utils/isValidObjectId.js';
import { validateBody } from '../utils/validateBody.js';
import { createPsychologistSchema } from '../validation/psychologists.js';

const router = Router();

router.get('/psychologists', ctrlWrapper(getPsychologistsController));

router.get(
  '/psychologists/:id',
  isValidObjectId('id'),
  ctrlWrapper(getPsychologistByIdController),
);

router.post(
  '/psychologists',
  validateBody(createPsychologistSchema),
  ctrlWrapper(postPsychologistController),
);

router.patch(
  '/psychologists/:id',
  isValidObjectId('id'),
  ctrlWrapper(patchPsychologistController),
);

router.delete(
  '/psychologists/:id',
  isValidObjectId('id'),
  ctrlWrapper(deletePsychologistController),
);

export default router;
