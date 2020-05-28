import express from 'express';
import farmerRoutes from '../farmerRoutes/farmerRoutes';
import productRoutes from '../productRoutes/productRoutes';
import userRoutes from '../userRoutes/userRoute';

const router = (dependencies) => {
  const adminRouter = express.Router();

  const userRouter = userRoutes(dependencies);
  const productRouter = productRoutes(dependencies);
  const farmerRouter = farmerRoutes(dependencies);

  adminRouter.use('/users', userRouter);
  adminRouter.use('/products', productRouter);
  adminRouter.use('/farmers', farmerRouter);

  return adminRouter;
};

export default router;
