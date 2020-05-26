/* eslint-disable consistent-return */
import AddFarmer from '../../application/useCases/farmer/addFarmer';
import GetAllFarmers from '../../application/useCases/user/getAllUsers';
import GetFarmer from '../../application/useCases/user/getUser';
import UpdateFarmer from '../../application/useCases/user/updateUser';
import DeleteFarmer from '../../application/useCases/user/deleteUser';
import AddProduct from '../../application/useCases/farmer/addProduct';
import GetAllProducts from '../../application/useCases/farmer/getAllProducts';
import DeleteProduct from '../../application/useCases/farmer/deleteProduct';
import UpdateProduct from '../../application/useCases/farmer/updateProduct';
import GetProduct from '../../application/useCases/farmer/getProduct';
import errorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { DatabaseService, EmailService } = dependencies;
  const { FarmerRepo, ProductRepo } = DatabaseService;

  async function addNewFarmer(req, res, next) {
    const AddFarmerCommand = AddFarmer(FarmerRepo, EmailService);
    const data = req.body;
    try {
      const response = await AddFarmerCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getFarmerById(req, res, next) {
    const GetFarmerCommand = GetFarmer(FarmerRepo);
    const { farmerId } = req.params;
    try {
      const response = await GetFarmerCommand.Execute(farmerId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function updateFarmer(req, res, next) {
    const UpdateFarmerCommand = UpdateFarmer(FarmerRepo);
    const { farmerId } = req.params;
    const update = req.body;
    try {
      const response = await UpdateFarmerCommand.Execute(farmerId, update);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function deleteFarmer(req, res, next) {
    const DeleteFarmerCommand = DeleteFarmer(FarmerRepo);
    const { farmerId } = req.params;
    try {
      const response = await DeleteFarmerCommand.Execute(farmerId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getAllFarmers(req, res, next) {
    const GetAllFarmersCommand = GetAllFarmers(FarmerRepo);
    try {
      const response = await GetAllFarmersCommand.Execute();
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function addProduct(req, res, next) {
    const { farmerId } = req.params;
    const formData = req.body;
    const data = { ...formData, ownerId: farmerId };
    const AddProductCommand = AddProduct(FarmerRepo, ProductRepo);
    try {
      const response = await AddProductCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function updateProduct(req, res, next) {
    const { farmerId, productId } = req.params;
    const update = req.body;
    const UpdateProductCommand = UpdateProduct(FarmerRepo, ProductRepo);
    try {
      const response = await UpdateProductCommand.Execute(farmerId, productId, update);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getProduct(req, res, next) {
    const { farmerId, productId } = req.params;
    const GetProductCommand = GetProduct(FarmerRepo, ProductRepo);
    try {
      const response = await GetProductCommand.Execute(farmerId, productId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function deleteProduct(req, res, next) {
    const { farmerId, productId } = req.params;
    const DeleteProductCommand = DeleteProduct(FarmerRepo, ProductRepo);
    try {
      const response = await DeleteProductCommand.Execute(farmerId, productId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getAllProducts(req, res, next) {
    const { farmerId } = req.params;
    const GetAllProductsCommand = GetAllProducts(FarmerRepo, ProductRepo);
    try {
      const response = await GetAllProductsCommand.Execute(farmerId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  return {
    addNewFarmer,
    getFarmerById,
    updateFarmer,
    deleteFarmer,
    getAllFarmers,
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
  };
};

export default controller;
