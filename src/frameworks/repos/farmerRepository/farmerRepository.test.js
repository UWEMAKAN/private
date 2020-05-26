/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import FarmerRepository from './farmerRepository';
import { farmers, products } from '../../../mockData';

const doc = products[1];
const farmer = { ...farmers[0], products: [] };
const document = {
  findOne: jest.fn((d) => (d._id ? farmer : Promise.reject(new Error('failed')))),
  updateOne: jest.fn((d = null) => (d ? doc : Promise.reject(new Error('failed'))))
};
const db = {
  collection: jest.fn().mockReturnValue(document)
};
const client = {
  close: jest.fn(),
  db: jest.fn().mockReturnValue(db)
};
const mongoClient = {
  connect: jest.fn().mockReturnValue(client)
};

const farmerRepository = new FarmerRepository(mongoClient);
const productInstance = {
  _id: '5ecac87276e5d94fe1fa04c7',
  name: 'Fish',
  category: 'Livestock',
  quantity: 240,
  price: 20,
  ownerId: '5ecac87276e5d94fe1fa04c5',
  soldOut: false,
  createdAt: 'Sun May 24 2020 20:18:10 GMT+0100 (West Africa Standard Time)'
};

describe('Testing the addProduct method of FarmerRepository class', () => {
  it('should return a product if product info is valid', async (done) => {
    expect.assertions(1);
    try {
      const product = await farmerRepository.addProduct('1', '2');
    } catch (err) {
      expect(mongoClient.connect).toBeCalled();
    } finally {
      done();
    }
  });

  it('should throw an Error if product info is invalid or does not exist', async (done) => {
    expect.assertions(2);
    try {
      const product = await farmerRepository.addProduct(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    }
    done();
  });
});
