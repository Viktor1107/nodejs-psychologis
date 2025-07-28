import { SORT_ORDER } from '../constants/index.js';
import { psychologistCollection } from '../db/models/psychologists.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllPsychologists = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const psychologistQuery = psychologistCollection.find();
  const psychologistCount = await psychologistCollection
    .find()
    .merge(psychologistQuery)
    .countDocuments();

  const psychologists = await psychologistQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(
    psychologistCount,
    perPage,
    page,
  );

  return {
    data: psychologists,
    ...paginationData,
  };
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
