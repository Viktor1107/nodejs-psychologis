import { psychologistCollection } from '../db/models/psychologists.js';

export const getAllPsychologists = async () => {
  const psychologists = await psychologistCollection.find();
  return psychologists;
};

export const getPsychologistById = async (id) => {
  const psychologist = await psychologistCollection.findById(id);
  return psychologist;
};

export const postPsychologist = async (payload) => {
  const psychologist = await psychologistCollection.create(payload);
  return psychologist;
};

export const patchPsychologist = async (id, payload) => {
  const psychologist = await psychologistCollection.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return psychologist;
};

export const deletePsychologist = async (id) => {
  const psychologist = await psychologistCollection.findByIdAndDelete(id);
  return psychologist;
};
