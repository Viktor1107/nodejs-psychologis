import { Types } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, `Invalid ${paramName} format`));
    }

    next();
  };
};
