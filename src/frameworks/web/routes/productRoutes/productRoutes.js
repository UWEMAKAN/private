import express from 'express';
import productController from '../../../../controllers/productController/productController';

const router = (dependencies) => {
  const productRouter = express.Router();
  const controller = productController(dependencies);

  productRouter.route('/')
    .get(controller.getAllProducts);
  productRouter.route('/:productId')
    .get(controller.getProduct);
  return productRouter;
};

export default router;
