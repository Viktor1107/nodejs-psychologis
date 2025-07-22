import createHttpError from 'http-errors';
import {
  deletePsychologist,
  getAllPsychologists,
  getPsychologistById,
  patchPsychologist,
  postPsychologist,
} from '../services/psychologists.js';

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
    next(createHttpError(404, 'Psychologist not found'));
    return;
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

export const patchPsychologistController = async (req, res, next) => {
  const { id } = req.params;

  const psychologist = await patchPsychologist(id, req.body);

  if (!psychologist) {
    next(createHttpError(404, 'Psychologist not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Data updated successfully!`,
    data: psychologist,
  });
};

export const deletePsychologistController = async (req, res, next) => {
  const { id } = req.params;

  const psychologist = await deletePsychologist(id);

  if (!psychologist) {
    next(createHttpError(404, 'Psychologist not found'));
    return;
  }

  res.status(204).json({
    status: 204,
    message: `Successfully delete a psychologist!`,
  });
};
