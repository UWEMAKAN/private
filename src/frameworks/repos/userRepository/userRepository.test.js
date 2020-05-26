/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import UserRepository from './userRepository';
import mockData from '../../../mockData';

const doc = mockData[1];
const document = {
  findOne: jest.fn((d) => (d.emailAddress || d._id ? doc : Promise.reject(new Error('failed'))))
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

const userRepository = new UserRepository(mongoClient);
const userInstance = {
  _id: '5eb172dfe13bbc0433426c2a',
  firstName: 'Uwem',
  lastName: 'Nkereuwem',
  emailAddress: 'uwemakan123@gmail.com',
  phoneNumber: '09064907927',
  stateOfOrigin: 'Akwa Ibom',
  nationality: 'Nigerian',
  address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
  createdAt: '58868758319',
  messages: [],
  photo: 'ajks;aowejowe',
  location: 'Lago'
};

describe('Testing the getByEmail method of UserRepository class', () => {
  it('should return a user if email is valid', async (done) => {
    expect.assertions(1);
    const { emailAddress } = userInstance;
    const user = await userRepository.getByEmail(emailAddress);
    expect(user).toBe(doc);
    done();
  });

  it('should throw an Error if email is invalid or does not exist', async (done) => {
    expect.assertions(2);
    try {
      const user = await userRepository.getByEmail(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    }
    done();
  });
});
