/* eslint-disable consistent-return */
import ErrorHandler from '../../../../common/ErrorHandler';

const auth = (dependencies) => {
  const { AuthRepo } = dependencies.DatabaseService;
  async function requireAuth(req, res, next) {
    const { authorization } = req.headers;
    try {
      if (authorization) {
        await AuthRepo.isAuthorized(authorization);
        return next();
      }
      throw new Error('Unauthorized');
    } catch (err) {
      ErrorHandler(err, req, res, next);
    }
  }

  return requireAuth;
};

export default auth;
