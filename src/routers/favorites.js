import { Router } from 'express';
import {
  addFavoritePsychologistController,
  deleteFavoritePsychologistController,
  getFavoritePsychologistsController,
} from '../controllers/favorites.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidObjectId } from '../middlewares/isValidObjectId.js';

const router = Router();

const favoritesRouter = router;

router.get('/', authenticate, ctrlWrapper(getFavoritePsychologistsController));
router.post(
  '/:psychologistId',
  authenticate,
  isValidObjectId('psychologistId'),
  ctrlWrapper(addFavoritePsychologistController),
);
router.delete(
  '/:psychologistId',
  authenticate,
  isValidObjectId('psychologistId'),
  ctrlWrapper(deleteFavoritePsychologistController),
);

export default favoritesRouter;
