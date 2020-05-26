import express from 'express';
import userRoutes from './userRoutes/userRoute';
import farmerRoutes from './farmerRoutes/farmerRoutes';
import productRoutes from './productRoutes/productRoutes';

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const userRouter = userRoutes(dependencies);
  const farmerRouter = farmerRoutes(dependencies);
  const productRouter = productRoutes(dependencies);

  routes.use('/users', userRouter);
  routes.use('/farmers', farmerRouter);
  routes.use('/products', productRouter);

  return routes;
};

export default apiRouter;
