/* eslint-disable no-unused-vars */
import AuthRepository from './authRepository';
import logger from '../../../common/winston';

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

describe('Testing the register method of AuthRepository', () => {
  const bound = jest.fn();
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should call connect, genSalt and hash methods as well as return the registered user', async (done) => {
    const input = { ...doc };
    const output = { ...doc, hash: 'farmreach' };
    expect.assertions(4);
    try {
      const registeredUser = await authRepository.register(input);
      expect(mongoClient.connect).toBeCalled();
      expect(bcrypt.genSalt).toBeCalled();
      expect(bcrypt.hash).toBeCalled();
      expect(registeredUser).toStrictEqual(output);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to register and should not return user', async (done) => {
    const input = null;
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.register(input);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the getByEmail method of AuthRepository', () => {
  const bound = jest.fn();
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should get registerd user by email and return registered user', async (done) => {
    const { emailAddress } = doc;
    const output = { ...doc, hash: 'farmreach' };
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.getByEmail(emailAddress);
      expect(mongoClient.connect).toBeCalled();
      expect(registeredUser).toStrictEqual(output);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to get registered user', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.getByEmail(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the signoutAuthentication method of AuthRepository', () => {
  const bound = jest.fn((token) => (token ? 1 : 0));
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should logout the user session and delete user session', async (done) => {
    const authorization = 'Bearer Token';
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.signoutAuthentication(authorization);
      expect(registeredUser).toStrictEqual(1);
      expect(promisify).toHaveBeenCalledWith(redisClient.del);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to logout user and should not delete user session', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.signoutAuthentication(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the signinAuthentication method of AuthRepository', () => {
  const bound = jest.fn((token) => (token ? 1 : 0));
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should log the user in and return user', async (done) => {
    const data = { emailAddress: 'uwemkan@gmail.com', password: 'uwemakan' };
    const authorization = 'Bearer Token';
    const output = { success: 'true', userId: '1', token: 'farmreach' };
    expect.assertions(1);
    try {
      const registeredUser = await authRepository.signinAuthentication(data, authorization);
      expect(registeredUser).toStrictEqual(output);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should log the user in and return user', async (done) => {
    const data = { emailAddress: 'uwemkan@gmail.com', password: 'uwemakan' };
    const authorization = null;
    const output = { id: '1' };
    try {
      const registeredUser = await authRepository.signinAuthentication(data, authorization);
      expect(registeredUser).toStrictEqual(output);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to register and should not return user', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.signinAuthentication(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the verifyUser method of AuthRepository', () => {
  const bound = jest.fn();
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should verify user email and password exist return registered user', async (done) => {
    const { emailAddress, password } = doc;
    const output = { ...doc, hash: 'farmreach' };
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.verifyUser(emailAddress, password);
      expect(registeredUser).toStrictEqual(output);
      expect(bcrypt.compare).toBeCalled();
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to verify user email and password exit and should not return user', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.verifyUser(null, null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the getAuthTokenId method of AuthRepository', () => {
  const bound = jest.fn((token) => (token ? '1234567890' : null));
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should get and return registered user id', async (done) => {
    const authorization = 'Bearer Token';
    const output = { id: '1234567890' };
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.getAuthTokenId(authorization);
      expect(registeredUser).toStrictEqual(output);
      expect(promisify).toHaveBeenCalledWith(redisClient.get);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to get registered user id', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.getAuthTokenId(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the signToken method of AuthRepository', () => {
  const bound = jest.fn();
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should sign token for the registered user and return the signed token', async (done) => {
    const { emailAddress } = doc;
    expect.assertions(1);
    try {
      const registeredUser = await authRepository.signToken(emailAddress);
      expect(typeof registeredUser).toBe('string');
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });
});

describe('Testing the setToken method of AuthRepository', () => {
  const bound = jest.fn((token, value) => token && value);
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should set the token for the registered user when the user logs in', async (done) => {
    const key = 'abcdefghijklmnopqrstuvwxyz';
    const value = '1234567890';
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.setToken(key, value);
      expect(registeredUser).toStrictEqual('1234567890');
      expect(promisify).toHaveBeenCalledWith(redisClient.set);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to set the token for the registered user', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.setToken(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the createSessions method of AuthRepository', () => {
  const bound = jest.fn((token, value) => token && value);
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should create session for the registered user and return the session info', async (done) => {
    const { emailAddress } = doc;
    const user = { emailAddress, _id: '1' };
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.createSessions(user);
      expect(registeredUser).toMatchObject({
        success: expect.any(String),
        userId: expect.any(String),
        token: expect.any(String)
      });
      expect(promisify).toHaveBeenCalledWith(redisClient.set);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to create user session and should not return session info', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.createSessions(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});

describe('Testing the isAuthorized method of AuthRepository', () => {
  const bound = jest.fn((token) => (token ? '1234567890' : null));
  const promise = {
    bind: jest.fn().mockReturnValue(bound)
  };
  const promisify = jest.fn().mockReturnValue(promise);

  const authRepository = new AuthRepository(mongoClient, bcrypt, redis, promisify);
  it('should check if registered user is authorized to access resource', async (done) => {
    const authorization = 'Bearer Token';
    const output = '1234567890';
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.isAuthorized(authorization);
      expect(registeredUser).toStrictEqual(output);
      expect(promisify).toHaveBeenCalledWith(redisClient.get);
    } catch (err) {
      logger.debug(err);
    } finally {
      done();
    }
  });

  it('should fail to check authorization', async (done) => {
    expect.assertions(2);
    try {
      const registeredUser = await authRepository.isAuthorized(null);
    } catch (err) {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
    } finally {
      done();
    }
  });
});
