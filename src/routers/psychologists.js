import { Router } from 'express';
import {
  getPsychologistByIdController,
  getPsychologistsController,
} from '../controllers/psychologist.js';

const router = Router();

router.get('/psychologists', getPsychologistsController);

router.get('/psychologists/:id', getPsychologistByIdController);

router.post('/psychologists', async (req, res, next) => {
  const psychologist = await postPsychologist();
  res.status(201).json({ data: newDoc });
});

export default router;
