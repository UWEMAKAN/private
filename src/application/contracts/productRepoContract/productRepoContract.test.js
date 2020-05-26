/* eslint-disable no-unused-vars */
import ProductRepoContract from './productRepoContract';
import Product from '../../../entities/product/product';

const product = {
  _id: '1',
  name: 'Catfish',
  quantity: 12,
  category: 'Livestock',
  price: 2000,
  ownerId: '1'
};

const productInstance = new Product(product);
const contract = new ProductRepoContract();

describe('testing the add method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.addProduct(productInstance);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
