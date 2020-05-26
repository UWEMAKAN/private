/* eslint-disable no-unused-vars */
import farmerController from './farmerController';
import Farmer from '../../entities/farmer/farmer';
import { farmers, products } from '../../mockData';
import Product from '../../entities/product/product';

const farmer = new Farmer(farmers[0]);
const product = new Product(products[0]);

const FarmerRepo = {
  add: jest.fn(async (farmerInstance) => Promise.resolve(farmerInstance)),
  delete: jest.fn(async (farmerId) => (farmerId ? farmer : Promise.reject(new Error('not found')))),
  getAll: jest.fn(async () => farmers),
  getById: jest.fn(async (farmerId) => (farmerId ? { ...farmer, products: [] } : Promise.reject(new Error('not found')))),
  update: jest.fn(async (farmerId, update) => (farmerId && update ? farmer : Promise.reject(new Error('not found')))),
  getByEmail: jest.fn(async (emailAddress) => (emailAddress === 'uwemakan@gmail.com' ? null : farmer))
};

const ProductRepo = {
  add: jest.fn(async (productInstance) => Promise.resolve(productInstance)),
  delete: jest.fn(async (productId) => (productId ? product : Promise.reject(new Error('not found')))),
  getAll: jest.fn(async () => products),
  getById: jest.fn(async (productId) => (productId ? product : Promise.reject(new Error('not found')))),
  update: jest.fn(async (productId, update) => (productId && update ? product : Promise.reject(new Error('not found')))),
  getProduct: jest.fn(async (productInfo) => (!productInfo ? null : product))
};

const dependencies = {
  DatabaseService: {
    FarmerRepo,
    ProductRepo
  }
};

const next = jest.fn();
const req = {
  body: farmers[0],
  params: {
    farmerId: '1234567890',
    productId: '09'
  },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};

describe('Testing User Controller', () => {
  const controller = farmerController(dependencies);
  it('should return object addNewFarmer, getFarmerById, updateFarmer, deleteFarmer, and getAllFarmers properties', () => {
    expect.assertions(2);
    expect(controller).toBeInstanceOf(Object);
    expect(controller).toMatchObject({
      addNewFarmer: expect.any(Function),
      getFarmerById: expect.any(Function),
      updateFarmer: expect.any(Function),
      deleteFarmer: expect.any(Function),
      getAllFarmers: expect.any(Function),
      addProduct: expect.any(Function),
      getAllProducts: expect.any(Function),
      getProduct: expect.any(Function),
      updateProduct: expect.any(Function),
      deleteProduct: expect.any(Function)
    });
  });
});

describe('Testing Farmer Controller', () => {
  const controller = farmerController(dependencies);
  const {
    addNewFarmer, getFarmerById, updateFarmer, deleteFarmer, getAllFarmers,
    addProduct, getAllProducts, getProduct, updateProduct, deleteProduct
  } = controller;

  describe('Testing addNewFarmer function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should add new farmer to the db and return the added farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await addNewFarmer(req, res, next);
      } catch (err) {
        expect(FarmerRepo.add).toHaveBeenCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to add new farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await addNewFarmer({ ...req, body: {} }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getFarmerById function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should get user by id from the db and return the farmer', async (done) => {
      expect.assertions(3);
      const farmerInstance = await getFarmerById(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(FarmerRepo.getById).toHaveBeenCalled();
      expect(farmerInstance).toBe(farmer);
      done();
    });

    it('should throw an Error when it fails to get farmer by Id', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await getFarmerById(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing updateFarmer function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should update farmer in the db and return the updated farmer', async (done) => {
      expect.assertions(3);
      const farmerInstance = await updateFarmer(
        { ...req, body: { phoneNumber: '08065556884' } }, res, next
      );
      expect(res.json).toHaveBeenCalled();
      expect(FarmerRepo.update).toHaveBeenCalled();
      expect(farmerInstance).toBe(farmer);
      done();
    });

    it('should throw an Error when it fails to update the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await updateFarmer(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing deleteFarmer function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should delete farmer from the db and return the deleted farmer', async (done) => {
      expect.assertions(3);
      const farmerInstance = await deleteFarmer(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(FarmerRepo.delete).toHaveBeenCalled();
      expect(farmerInstance).toBe(farmer);
      done();
    });

    it('should throw an Error when it fails to delete the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await deleteFarmer(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getAllFarmers function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmers)
    };
    it('should get and return all farmers', async (done) => {
      expect.assertions(3);
      const farmerInstances = await getAllFarmers(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(FarmerRepo.getAll).toHaveBeenCalled();
      expect(farmerInstances).toBe(farmers);
      done();
    });
  });

  describe('Testing addProduct function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should add product to list of products of farmer', async (done) => {
      expect.assertions(2);
      try {
        const farmerInstance = await addProduct(req, res, next);
      } catch (err) {
        expect(FarmerRepo.getById).toBeCalled();
        expect(ProductRepo.add).toBeCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to addProduct the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await addProduct(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getAllProducts function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should get all products of the farmer', async (done) => {
      expect.assertions(2);
      try {
        const farmerInstance = await getAllProducts(req, res, next);
        expect(FarmerRepo.getById).toBeCalled();
        expect(ProductRepo.add).toBeCalled();
      } catch (err) {
        //
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to getAllProducts of the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await getAllProducts(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getProduct function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should get product of the farmer', async (done) => {
      expect.assertions(2);
      try {
        const farmerInstance = await getProduct(req, res, next);
      } catch (err) {
        expect(FarmerRepo.getById).toBeCalled();
        expect(ProductRepo.getById).toBeCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to getProduct of the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await getProduct(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing updateProduct function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should update product of the farmer', async (done) => {
      expect.assertions(2);
      try {
        const farmerInstance = await updateProduct(req, res, next);
      } catch (err) {
        expect(FarmerRepo.getById).toBeCalled();
        expect(ProductRepo.getById).toBeCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to updateProduct of the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await updateProduct(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing deleteProduct function', () => {
    const res = {
      json: jest.fn().mockReturnValue(farmer)
    };
    it('should delete product of the farmer', async (done) => {
      expect.assertions(2);
      try {
        const farmerInstance = await deleteProduct(req, res, next);
      } catch (err) {
        expect(FarmerRepo.getById).toBeCalled();
        expect(ProductRepo.getById).toBeCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to deleteProduct of the farmer', async (done) => {
      expect.assertions(1);
      try {
        const farmerInstance = await deleteProduct(
          { ...req, params: { farmerId: null } }, res, next
        );
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });
});
