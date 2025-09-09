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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { authenticate } from '../middlewares/authenticate.js';

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
  authenticate,
  checkRoles(ROLES.ADMIN),
  validateBody(createPsychologistSchema),
  ctrlWrapper(postPsychologistController),
);

router.patch(
  '/:id',
  isValidObjectId('id'),
  authenticate,
  checkRoles(ROLES.ADMIN),
  validateBody(patchPsychologistSchema),
  ctrlWrapper(patchPsychologistController),
);

router.delete(
  '/:id',
  isValidObjectId('id'),
  authenticate,
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(deletePsychologistController),
);

export default psychologistRouter;
