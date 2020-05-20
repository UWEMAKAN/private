/* eslint-disable consistent-return */
import Register from '../../application/auth/register';
import Signin from '../../application/auth/signin';
import ErrorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { DatabaseService } = dependencies;
  const { AuthRepo } = DatabaseService;

  async function register(req, res, next) {
    const RegisterUserCommand = Register(AuthRepo);
    const data = req.body;
    try {
      const response = await RegisterUserCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  async function signin(req, res, next) {
    const SigninUserCommand = Signin(AuthRepo);
    const data = req.body;
    const { authorization } = req.headers;
    try {
      const response = await SigninUserCommand.Execute(data, authorization);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  async function signout(req, res, next) {
    const { authorization } = req.headers;
    try {
      await AuthRepo.signoutAuthentication(authorization);
      return res.json('signout successful');
    } catch (err) {
      err.status = 400;
      ErrorHandler(err, req, res, next);
    }
  }

  return {
    register,
    signin,
    signout
  };
};

export default controller;
