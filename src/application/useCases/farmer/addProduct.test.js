/* eslint-disable no-unused-vars */
import addProduct from './addProduct';
import { products, farmers } from '../../../mockData';
import Product from '../../../entities/product/product';

const FarmerRepository = {
  getByEmail: jest.fn(async (email) => (email === 'test@test.com' ? farmers[0] : null)),
  addProduct: jest.fn(async (product) => product)
};

const ProductRepository = {
  getProduct: jest.fn(async (info) => (info.ownerId && info.name === 'Fish' ? products[0] : null)),
  add: jest.fn(async (product) => (product ? { ...products[0], ops: [{ _id: '2' }] } : Promise.reject(Error('product not added'))))
};

describe('Testing methods add and getProduct use case addProduct', () => {
  const command = addProduct(FarmerRepository, ProductRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should throw an Error', async (done) => {
    expect.assertions(2);
    try {
      const product = await Execute({});
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });

  it('should throw an Error', async (done) => {
    expect.assertions(2);
    try {
      const product = await Execute({ ...products[0], ownerId: '1' });
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
      expect(err).toStrictEqual(Error('product already exists'));
    } finally {
      done();
    }
  });

  it('should return the added product', async (done) => {
    expect.assertions(3);
    try {
      const product = await Execute({ ...products[1], ownerId: '1' });
      expect(ProductRepository.getProduct).toBeCalled();
      expect(ProductRepository.add).toBeCalled();
      expect(FarmerRepository.addProduct).toBeCalled();
    } catch (err) {
      //
    } finally {
      done();
    }
  });
});
