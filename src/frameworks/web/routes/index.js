import express from 'express';
import userRoutes from './userRoutes/userRoute';

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const userRouter = userRoutes(dependencies);

  routes.use('/users', userRouter);

  return routes;
};

export default apiRouter;
