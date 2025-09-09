import createHttpError from 'http-errors';

export const checkRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    const { user } = req;

    if (!user) {
      return next(
        createHttpError(
          401,
          'You do not have access to perform these actions.',
        ),
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return next(createHttpError(403, 'Forbidden'));
    }

    return next();
  };
