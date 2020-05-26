/* eslint-disable no-unused-vars */
import productController from './productController';
import ProductRepository from '../../frameworks/repos/productRepository/productRepository';
import Product from '../../entities/product/product';
import logger from '../../common/winston';
import { products } from '../../mockData';

const product = new Product(products[0]);

const ProductRepo = {
  getAll: jest.fn(async () => products),
  getById: jest.fn(async (productId) => (productId ? product : Promise.reject(new Error('not found'))))
};

const dependencies = {
  DatabaseService: {
    ProductRepo
  }
};

const next = jest.fn();
const req = {
  body: products[0],
  params: {
    productId: '1234567890'
  },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};

describe('Testing product Controller', () => {
  const controller = productController(dependencies);
  it('should return object with getProduct and getAllProducts properties', () => {
    expect.assertions(2);
    expect(controller).toBeInstanceOf(Object);
    expect(controller).toMatchObject({
      getProduct: expect.any(Function),
      getAllProducts: expect.any(Function)
    });
  });
});

describe('Testing Product Controller', () => {
  const controller = productController(dependencies);
  const {
    getProduct, getAllProducts
  } = controller;

  describe('Testing getProduct function', () => {
    const res = {
      json: jest.fn().mockReturnValue(product)
    };
    it('should get product by id from the db and return the product', async (done) => {
      expect.assertions(3);
      const productInstance = await getProduct(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(ProductRepo.getById).toHaveBeenCalled();
      expect(productInstance).toBe(product);
      done();
    });

    it('should throw an Error when it fails to get user by Id', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await getProduct({ ...req, params: { productId: null } }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getAllProducts function', () => {
    const res = {
      json: jest.fn().mockReturnValue(products)
    };
    it('should get and return all products', async (done) => {
      expect.assertions(3);
      const userInstances = await getAllProducts(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(ProductRepo.getAll).toHaveBeenCalled();
      expect(userInstances).toBe(products);
      done();
    });
  });
});
