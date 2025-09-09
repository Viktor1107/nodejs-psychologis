import createHttpError from 'http-errors';
import { psychologistCollection } from '../db/models/psychologists.js';

export const checkOwnership = async (req, res, next) => {
  const { user } = req;
  const { psychologistId } = req.params;

  if (!psychologistId) {
    return next(createHttpError(400, 'Missing psychologistId'));
  }

  if (user.role === 'admin') {
    return next();
  }

  const psychologist = await psychologistCollection.findOne({
    _id: psychologistId,
    adminId: user._id,
  });

  if (!psychologist) {
    return next(createHttpError(403, 'Forbidden'));
  }

  return next();
};
