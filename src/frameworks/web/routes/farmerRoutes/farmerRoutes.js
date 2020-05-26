import express from 'express';
import farmerController from '../../../../controllers/farmerController/farmerController';

const router = (dependencies) => {
  const farmerRouter = express.Router();
  const controller = farmerController(dependencies);

  farmerRouter.route('/')
    .post(controller.addNewFarmer)
    .get(controller.getAllFarmers);
  farmerRouter.route('/:farmerId')
    .get(controller.getFarmerById)
    .patch(controller.updateFarmer)
    .delete(controller.deleteFarmer);
  farmerRouter.route('/:farmerId/products')
    .post(controller.addProduct)
    .get(controller.getAllProducts);
  farmerRouter.route('/:farmerId/products/:productId')
    .get(controller.getProduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct);
  return farmerRouter;
};

export default router;
