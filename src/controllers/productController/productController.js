/* eslint-disable consistent-return */
import GetAllProducts from '../../application/useCases/product/getAllProducts';
import GetProduct from '../../application/useCases/product/getProduct';
import errorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { DatabaseService } = dependencies;
  const { ProductRepo } = DatabaseService;

  async function getProduct(req, res, next) {
    const { productId } = req.params;
    const GetProductCommand = GetProduct(ProductRepo);
    try {
      const response = await GetProductCommand.Execute(productId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getAllProducts(req, res, next) {
    const GetAllProductsCommand = GetAllProducts(ProductRepo);
    try {
      const response = await GetAllProductsCommand.Execute();
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  return {
    getProduct,
    getAllProducts
  };
};

export default controller;
