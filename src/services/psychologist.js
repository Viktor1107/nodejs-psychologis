import { psychologistCollection } from '../db/models/psychologists.js';

export const getAllPsychologists = async () => {
  const psychologists = await psychologistCollection.find();
  return psychologists;
};

export const getPsychologistById = async (id) => {
  const psychologist = await psychologistCollection.findById(id);
  return psychologist;
};

export const postPsychologist = async () => {
  const psychologist = await psychologistCollection.create();
  return psychologist;
};

export const patchPsychologist = async (id) => {
  const psychologist = await psychologistCollection.findByIdAndUpdate(id);
  return psychologist;
};

export const deletePsychologist = async (id) => {
  const psychologist = await psychologistCollection.findByIdAndDelete(id);
  return;
};
