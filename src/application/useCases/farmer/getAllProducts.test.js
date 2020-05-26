/* eslint-disable no-unused-vars */
import getAllProducts from './getAllProducts';
import { products, farmers } from '../../../mockData';
import Product from '../../../entities/product/product';

const FarmerRepository = {
  getById: jest.fn(async (id) => (id !== '1' ? { ...farmers[0], products: ['1'] } : null)),
  update: jest.fn(async (ps) => ({ ...farmers[0], products: ps }))
};

const ProductRepository = {
  getById: jest.fn(async (productId) => (productId ? products[0] : null)),
  delete: jest.fn(async (productId) => (productId ? { ...products[0], _id: '1' } : Promise.reject(Error('product not added'))))
};

describe('Testing method delete of use case getAllProducts', () => {
  const command = getAllProducts(FarmerRepository, ProductRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should throw an Error', async (done) => {
    const farmerId = '1';
    expect.assertions(2);
    try {
      const product = await Execute(farmerId);
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
      expect(err).toStrictEqual(Error('farmer not found'));
    } finally {
      done();
    }
  });

  it('should return the added product', async (done) => {
    const farmerId = '2';
    expect.assertions(2);
    const product = await Execute(farmerId);
    expect(FarmerRepository.getById).toBeCalled();
    expect(product).toBeInstanceOf(Array);
    done();
  });
});
