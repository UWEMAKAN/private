/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import UserRepository from './userRepository';
import mockData from '../../../mockData';
import logger from '../../../common/winston';

const doc = mockData[1];
const docs = {
  toArray: jest.fn().mockReturnValue(mockData)
};

const func = (d = null) => (d ? doc : Promise.reject(new Error('failed')));
const document = {
  insertOne: jest.fn(func),
  insertMany: jest.fn(func),
  findOne: jest.fn((d) => (d.emailAddress || d._id ? doc : Promise.reject(new Error('failed')))),
  findById: jest.fn((d) => (d._id ? doc : Promise.reject(new Error('failed')))),
  find: jest.fn().mockReturnValue(docs),
  updateOne: jest.fn(func),
  deleteOne: jest.fn(func),
  deleteMany: jest.fn().mockReturnValue([])
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

describe('Testing the add method of UserRepository class', () => {
  it('should save user and return the added user', async (done) => {
    expect.assertions(2);
    try {
      const user = await userRepository.add(userInstance);
      expect(mongoClient.connect).toBeCalled();
      expect(user).toBe(doc);
    } catch (err) {
      logger.debug(doc);
    } finally {
      done();
    }
  });

  it('should fail to save user and return an Error object', async (done) => {
    expect.assertions(2);
    try {
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

describe('Testing the getById method of UserRepository class', () => {
  it('should return a user if userId is valid', async (done) => {
    expect.assertions(1);
    const { _id: userId } = userInstance;
    const user = await userRepository.getById(userId);
    expect(user).toBe(doc);
    done();
  });
});

describe('Testing the update method of UserRepository class', () => {
  it('should return a user if userId is valid', async (done) => {
    expect.assertions(1);
    const { _id: userId } = userInstance;
    const update = { emailAddress: 'uwemakan123@gmail.com' };
    const user = await userRepository.update(userId, update);
    expect(user).toBe(doc);
    done();
  });
});

describe('Testing the delete method of UserRepository class', () => {
  it('should return a user if userId is valid', async (done) => {
    expect.assertions(1);
    const { _id: userId } = userInstance;
    const user = await userRepository.delete(userId);
    expect(user).toBe(doc);
    done();
  });
});

describe('Testing the getAll method of UserRepository class', () => {
  it('should return a user if email is valid', async (done) => {
    expect.assertions(1);
    const users = await userRepository.getAll();
    expect(users).toBe(mockData);
    done();
  });
});

describe('Testing the deleteMany method of UserRepository class', () => {
  it('should return a user if email is valid', async (done) => {
    expect.assertions(1);
    const users = await userRepository.deleteAll();
    expect(users).toStrictEqual([]);
    done();
  });
});
