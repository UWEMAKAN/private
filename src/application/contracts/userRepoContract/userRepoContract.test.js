/* eslint-disable no-unused-vars */
import UserRepoContract from './userRepoContract';
import User from '../../../entities/user/user';

const data = {
  firstName: 'Uwem',
  lastName: 'Nkereuwem',
  emailAddress: 'uwemakan@gmail.com',
  phoneNumber: '09064907927',
  stateOfOrigin: 'Akwa Ibom',
  nationality: 'Nigerian',
  address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
  photo: 'ajks;aowejowe',
  location: 'Lago'
};
const user = new User(data);
const userId = 1;

describe('Testing UserRepoContract', () => {
  const contract = new UserRepoContract();
  describe('testing the getByEmail method', () => {
    it('should throw new Error("not implemented")', async (done) => {
      expect.assertions(1);
      try {
        const value = await contract.getByEmail(user.emailAddress);
      } catch (err) {
        expect(err).toStrictEqual(Error('not implemented'));
      } finally {
        done();
      }
    });
  });
});
