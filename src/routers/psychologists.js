import { Router } from 'express';
import {
  deletePsychologistController,
  getPsychologistByIdController,
  getPsychologistsController,
  patchPsychologistController,
  postPsychologistController,
} from '../controllers/psychologist.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidObjectId } from '../middlewares/isValidObjectId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createPsychologistSchema,
  patchPsychologistSchema,
} from '../validation/psychologists.js';

const router = Router();

const psychologistRouter = router;

router.get('/', ctrlWrapper(getPsychologistsController));

router.get(
  '/:id',
  isValidObjectId('id'),
  ctrlWrapper(getPsychologistByIdController),
);

router.post(
  '/',
  validateBody(createPsychologistSchema),
  ctrlWrapper(postPsychologistController),
);

router.patch(
  '/:id',
  isValidObjectId('id'),
  validateBody(patchPsychologistSchema),
  ctrlWrapper(patchPsychologistController),
);

router.delete(
  '/:id',
  isValidObjectId('id'),
  ctrlWrapper(deletePsychologistController),
);

export default psychologistRouter;
