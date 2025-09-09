import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessions.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let session;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      session = await SessionsCollection.findOne({ accessToken: token });
      if (!session) return next(createHttpError(401, 'Invalid access token'));
    } else {
      const { sessionId } = req.cookies;
      if (!sessionId)
        return next(createHttpError(401, 'No sessionId provided'));
      session = await SessionsCollection.findById(sessionId);
      if (!session) return next(createHttpError(401, 'Session not found'));
    }

    const isExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isExpired) return next(createHttpError(401, 'Access token expired'));

    const user = await UsersCollection.findById(session.userId);
    if (!user) return next(createHttpError(401, 'User not found'));

    req.user = user;
    req.session = session;

    next();
  } catch (err) {
    next(err);
  }
};

// import createHttpError from 'http-errors';
// import { SessionsCollection } from '../db/models/sessions.js';
// import { UsersCollection } from '../db/models/user.js';

// export const authenticate = async (req, res, next) => {
//   const authHeader = req.get('Authorization');

//   if (!authHeader) {
//     next(createHttpError(401, 'Please provide Authorization header'));
//     return;
//   }

//   const bearer = authHeader.split(' ')[0];
//   const token = authHeader.split(' ')[1];

//   if (bearer !== 'Bearer' || !token) {
//     next(createHttpError(401, 'Auth header should be of type Bearer'));
//     return;
//   }

//   const session = await SessionsCollection.findOne({ accessToken: token });

//   if (!session) {
//     next(createHttpError(401, 'Session not found'));
//     return;
//   }

//   const isAccessTokenExpired =
//     new Date() > new Date(session.accessTokenValidUntil);

//   if (isAccessTokenExpired) {
//     next(createHttpError(401, 'Access token expired'));
//   }

//   const user = await UsersCollection.findById(session.userId);

//   if (!user) {
//     next(createHttpError(401));
//     return;
//   }

//   req.user = user;

//   next();
// };
