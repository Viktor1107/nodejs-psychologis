import { Types } from 'mongoose';
import {
  getAllPsychologists,
  getPsychologistById,
} from '../services/psychologist.js';

export const getPsychologistsController = async (req, res) => {
  const psychologists = await getAllPsychologists();

  res.json({
    status: 200,
    message: 'Successfully found psychologists',
    data: psychologists,
  });
};

export const getPsychologistByIdController = async (req, res) => {
  const { id } = req.params;
  const psychologist = await getPsychologistById(id);

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid psychologist ID format' });
  }

  if (!psychologist) {
    return res.status(404).json({
      message: 'Psychologist not found',
    });
  }

  res.status(200).json({
    data: psychologist,
  });
};
