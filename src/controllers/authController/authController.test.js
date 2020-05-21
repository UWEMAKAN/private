/* eslint-disable no-unused-vars */
import AuthController from './authController';
import AuthRepository from '../../frameworks/repos/authRepository/authRepository';

jest.mock('../../frameworks/repos/authRepository/authRepository.js');

const redisClient = {
  del: jest.fn(),
  get: jest.fn(),
  set: jest.fn()
};
const redis = {
  createClient: jest.fn().mockReturnValue(redisClient)
};

const bcrypt = {
  genSalt: jest.fn().mockReturnValue(2),
  hash: jest.fn().mockReturnValue('farmreach'),
  compare: jest.fn((p) => p === 'uwemakan')
};

const doc = {
  firstName: 'Uwem',
  lastName: 'Akan',
  emailAddress: 'uwemakan@gmail.com',
  phoneNumber: '09064907927',
  password: 'uwemakan',
  confirmPassword: 'uwemakan'
};

const document = {
  insertOne: jest.fn((d = null) => (d ? { ...doc, hash: 'farmreach' } : Promise.reject(new Error('failed')))),
  findOne: jest.fn((d) => (d.emailAddress ? { ...doc, hash: 'farmreach' } : Promise.reject(new Error('failed'))))
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

const bound = jest.fn();
const promise = {
  bind: jest.fn().mockReturnValue(bound)
};
const promisify = jest.fn().mockReturnValue(promise);

const AuthRepo = new AuthRepository(mongoClient, bcrypt, redis, promisify);

const dependencies = {
  DatabaseService: {
    AuthRepo
  }
};
const next = jest.fn();
const req = {
  body: doc,
  params: {
    userId: '1234567890'
  },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};
const controller = AuthController(dependencies);
const {
  register,
  signin,
  signout
} = controller;

describe('Testing the AuthController', () => {
  it('should return an object with three properties that are instances of Function', () => {
    expect.assertions(2);
    expect(controller).toBeInstanceOf(Object);
    expect(controller).toMatchObject({
      register: expect.any(Function),
      signin: expect.any(Function),
      signout: expect.any(Function)
    });
  });
});

describe('Testing register function', () => {
  const res = {
    json: jest.fn().mockReturnValue(doc)
  };
  it('should call the register', async (done) => {
    expect.assertions(3);
    const userInstance = await register(req, res, next);
    expect(res.json).toHaveBeenCalled();
    expect(AuthRepo.register).toHaveBeenCalled();
    expect(userInstance).toBe(doc);
    done();
  });

  it('should throw an Error when it fails to register user', async (done) => {
    expect.assertions(1);
    try {
      const userInstance = await register({ ...req, body: {} }, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
    } finally {
      done();
    }
  });
});

describe('Testing signin function', () => {
  const res = {
    json: jest.fn().mockReturnValue(doc)
  };
  it('should call the signin', async (done) => {
    const { emailAddress, password } = doc;
    const data = { emailAddress, password };
    expect.assertions(3);
    const userInstance = await signin(
      { ...req, body: data, headers: { authorization: null } }, res, next
    );
    expect(res.json).toHaveBeenCalled();
    expect(AuthRepo.signinAuthentication).toHaveBeenCalled();
    expect(userInstance).toBe(doc);
    done();
  });

  it('should call the signin', async (done) => {
    const { emailAddress, password } = doc;
    const data = { emailAddress, password };
    expect.assertions(3);
    const userInstance = await signin(
      { ...req, body: data, headers: { authorization: 'Bearer Token' } }, res, next
    );
    expect(res.json).toHaveBeenCalled();
    expect(AuthRepo.signinAuthentication).toHaveBeenCalled();
    expect(userInstance).toBe(doc);
    done();
  });

  it('should throw an Error when it fails to signin user', async (done) => {
    expect.assertions(1);
    try {
      const userInstance = await signin({ ...req, body: {} }, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
    } finally {
      done();
    }
  });
});

describe('Testing signout function', () => {
  const res = {
    json: jest.fn().mockReturnValue(doc)
  };
  it('should call the signout', async (done) => {
    const { emailAddress, password } = doc;
    const data = { emailAddress, password };
    expect.assertions(2);
    const userInstance = await signout(
      { headers: { authorization: 'Bearer Token' } }, res, next
    );
    expect(res.json).toHaveBeenCalled();
    expect(AuthRepo.signoutAuthentication).toHaveBeenCalled();
    done();
  });

  it('should throw an Error when it fails to signout user', async (done) => {
    expect.assertions();
    try {
      const userInstance = await signout({ ...req, headers: { authorization: null } }, res, next);
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
    } finally {
      done();
    }
  });
});
