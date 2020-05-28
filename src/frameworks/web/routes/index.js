import express from 'express';
import userRoutes from './userRoutes/userRoute';
import farmerRoutes from './farmerRoutes/farmerRoutes';
import productRoutes from './productRoutes/productRoutes';
import adminRoutes from './adminRoutes/adminRoutes';

const apiRouter = (dependencies) => {
  const routes = express.Router();

  const userRouter = userRoutes(dependencies);
  const farmerRouter = farmerRoutes(dependencies);
  const productRouter = productRoutes(dependencies);
  const adminRouter = adminRoutes(dependencies);

  routes.use('/users', userRouter);
  routes.use('/farmers', farmerRouter);
  routes.use('/products', productRouter);
  routes.use('/admin', adminRouter);

  return routes;
};

export default apiRouter;
