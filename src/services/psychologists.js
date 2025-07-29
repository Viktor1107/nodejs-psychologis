import { SORT_ORDER } from '../constants/index.js';
import { psychologistCollection } from '../db/models/psychologists.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseSpecialization } from '../utils/parseFilterParams.js';

export const getAllPsychologists = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  specialization,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const specializationFilter = parseSpecialization(specialization);

  const filter = {};

  if (specializationFilter) {
    const specializationsArray = specializationFilter
      .split(',')
      .map((word) => word.trim());

    filter.$or = specializationsArray.map((word) => ({
      specialization: { $regex: word, $options: 'i' },
    }));
  }

  const psychologistQuery = psychologistCollection.find(filter);
  const psychologistCount = await psychologistCollection
    .find(filter)
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
