import UserRepository from './userRepository';

jest.mock('./userRepository.js');

const userRepository = new UserRepository();
const userInstance = {
  _id: '5eb172dfe13bbc0433426c2a',
  firstName: 'Uwem',
  lastName: 'Nkereuwem',
  emailAddress: 'uwemakan@gmail.com',
  phoneNumber: '09064907927',
  stateOfOrigin: 'Akwa Ibom',
  nationality: 'Nigerian',
  address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
  createdAt: '58868758319',
  messages: [],
  photo: 'ajks;aowejowe',
  location: 'Lago'
};

describe('Testing the add method of UserRepository class', () => {
  it('should save user and return the added user', async (done) => {
    expect.assertions(1);
    const user = await userRepository.add(userInstance);
    expect(typeof user).toBe('object');
    done();
  });

  it('should fail to save user and return an Error object', async (done) => {
    expect.assertions(2);
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await userRepository.add(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    }
    done();
  });
});

describe('Testing the getByEmail method of UserRepository class', () => {
  it('should return a user if email is valid', async (done) => {
    expect.assertions(1);
    const { emailAddress } = userInstance;
    const user = await userRepository.getByEmail(emailAddress);
    expect(typeof user).toBe('object');
    done();
  });

  it('should not return a user if email is invalid or does not exist', async (done) => {
    expect.assertions(2);
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await userRepository.getByEmail('uwem.nkereuwem@gmail.com');
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    }
    done();
  });
});
