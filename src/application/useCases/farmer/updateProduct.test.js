/* eslint-disable no-unused-vars */
import updateProduct from './updateProduct';
import { products, farmers } from '../../../mockData';
import Product from '../../../entities/product/product';

const update = { price: 200, quantity: 145 };

const FarmerRepository = {
  getById: jest.fn(async (id) => (id ? { ...farmers[0], products: ['1'] } : null)),
  update: jest.fn(async (ps) => ({ ...farmers[0], products: ps }))
};

const ProductRepository = {
  getById: jest.fn(async (productId) => (productId ? products[0] : null)),
  update: jest.fn(async (productId, data) => (productId && data ? { ...products[0] } : Promise.reject(Error('product not added'))))
};

describe('Testing use case updateProduct', () => {
  const command = updateProduct(FarmerRepository, ProductRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should throw an Error', async (done) => {
    const farmerId = '1';
    const productId = '2';
    expect.assertions(2);
    try {
      const product = await Execute(farmerId, productId, update);
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
      expect(err).toStrictEqual(Error('not my product'));
    } finally {
      done();
    }
  });

  it('should return the added product', async (done) => {
    const farmerId = '1';
    const productId = '1';
    expect.assertions(3);
    const product = await Execute(farmerId, productId, update);
    expect(FarmerRepository.getById).toBeCalled();
    expect(ProductRepository.update).toBeCalled();
    expect(typeof product).toBe('string');
    done();
  });
});
