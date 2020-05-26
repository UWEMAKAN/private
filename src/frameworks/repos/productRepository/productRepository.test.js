/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import ProductRepository from './productRepository';
import { products } from '../../../mockData';

const doc = products[1];
const document = {
  findOne: jest.fn((d) => (d.name || d._id ? doc : Promise.reject(new Error('failed'))))
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

const productRepository = new ProductRepository(mongoClient);
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

describe('Testing the getProduct method of ProductRepository class', () => {
  it('should return a product if email is valid', async (done) => {
    expect.assertions(1);
    const { name } = productInstance;
    const product = await productRepository.getProduct({ name });
    expect(product).toBe(doc);
    done();
  });

  it('should throw an Error if email is invalid or does not exist', async (done) => {
    expect.assertions(2);
    try {
      const product = await productRepository.getByEmail(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    }
    done();
  });
});
