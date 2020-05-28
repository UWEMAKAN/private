/* eslint-disable no-underscore-dangle */
import deleteUser from './deleteUser';
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
  delete: jest.fn(async (userId) => (userId ? { user } : null))
};

describe('Testing deleteUser use case', () => {
  const command = deleteUser(UserRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should return string success', async (done) => {
    const userId = '1';
    const userInstance = await Execute(userId);
    expect.assertions(1);
    expect(typeof userInstance).toBe('string');
    done();
  });
});
