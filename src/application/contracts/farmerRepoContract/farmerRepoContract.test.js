/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import FarmerRepoContract from './farmerRepoContract';

const product = {
  _id: '1',
  name: 'Catfish',
  quantity: 12,
  category: 'Livestock',
  price: 2000,
  ownerId: '1'
};

const contract = new FarmerRepoContract();

describe('testing the add method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.addProduct('1', product._id);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      done();
    }
  });
});
