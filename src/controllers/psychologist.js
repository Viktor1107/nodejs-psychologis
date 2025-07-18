import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import {
  getAllPsychologists,
  getPsychologistById,
  postPsychologist,
} from '../services/psychologist.js';

export const getPsychologistsController = async (req, res, next) => {
  const psychologists = await getAllPsychologists();

  res.json({
    status: 200,
    message: 'Successfully found psychologists',
    data: psychologists,
  });
};

export const getPsychologistByIdController = async (req, res, next) => {
  const { id } = req.params;

  const psychologist = await getPsychologistById(id);

  if (!psychologist) {
    throw createHttpError(404, 'Psychologist not found');
  }

  res.status(200).json({
    data: psychologist,
  });
};

export const postPsychologistController = async (req, res) => {
  const psychologist = await postPsychologist(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a psychologist!`,
    data: psychologist,
  });
};
