import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteAvatarController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
  uploadAvatarController,
} from '../controllers/auth.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { UPLOAD_DIR } from '../constants/index.js';

const router = Router();

const authRouter = router;

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(uploadAvatarController),
);

router.delete('/avatar', authenticate, ctrlWrapper(deleteAvatarController));

export default authRouter;
