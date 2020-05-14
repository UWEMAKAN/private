import express from 'express';
import userController from '../../../../controllers/userController';

const router = (dependencies) => {
  const userRouter = express.Router();
  const controller = userController(dependencies);

  userRouter.route('/')
    .post(controller.addNewUser)
    .get(controller.getAllUsers);
  userRouter.route('/:userId')
    .get(controller.getUserById)
    .patch(controller.updateUser)
    .delete(controller.deleteUser);
  return userRouter;
};

export default router;
