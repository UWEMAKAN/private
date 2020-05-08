import express from 'express';
import userController from '../../../../controllers/userController';

const router = (dependencies) => {
  const userRouter = express.Router();
  const controller = userController(dependencies);

  userRouter.route('/')
    .post(controller.addNewUser);

  return userRouter;
};

export default router;
