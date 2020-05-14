/* eslint-disable no-underscore-dangle */
import getUser from './getUser';
import User from '../../../entities/user/user';

const data = {
  _id: '1',
  firstName: 'Uwem',
  lastName: 'Nkereuwem',
  emailAddress: 'uwemakan@gmail.com',
  phoneNumber: '09064907927',
  stateOfOrigin: 'Akwa Ibom',
  nationality: 'Nigerian',
  address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
  photo: 'ajks;aowejowe',
  location: 'Lagos'
};
const user = new User(data);
const UserRepository = {
  getById: jest.fn(async (userId) => (userId ? user : null))
};

describe('Testing getUser use case', () => {
  const command = getUser(UserRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should return a list of users', async (done) => {
    const userId = '1';
    const userInstance = await Execute(userId);
    expect.assertions(1);
    expect(userInstance).toBeInstanceOf(User);
    done();
  });
});
