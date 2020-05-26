import express from 'express';
import authController from '../../../../controllers/authController/authController';

const router = (dependencies) => {
  const authRouter = express.Router();
  const controller = authController(dependencies);

  authRouter.route('/register')
    .post(controller.register);
  authRouter.route('/login')
    .post(controller.signin);
  authRouter.route('/logout')
    .post(controller.signout);
  return authRouter;
};

export default router;
