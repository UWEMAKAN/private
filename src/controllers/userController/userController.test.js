/* eslint-disable no-unused-vars */
import userController from './userController';
import User from '../../entities/user/user';
import logger from '../../common/winston';
import mockData from '../../mockData';

const user = new User(mockData[0]);

const UserRepo = {
  add: jest.fn(async (userInstance) => Promise.resolve(userInstance)),
  delete: jest.fn(async (userId) => (userId ? user : Promise.reject(new Error('not found')))),
  getAll: jest.fn(async () => mockData),
  getById: jest.fn(async (userId) => (userId ? user : Promise.reject(new Error('not found')))),
  update: jest.fn(async (userId, update) => (userId && update ? user : Promise.reject(new Error('not found')))),
  getByEmail: jest.fn(async (emailAddress) => (emailAddress === 'uwemakan@gmail.com' ? null : user))
};

const dependencies = {
  DatabaseService: {
    UserRepo
  },
  EmailService: {
    notify: () => {
      logger.debug('you have been notified');
    }
  }
};

const next = jest.fn();
const req = {
  body: mockData[0],
  params: {
    userId: '1234567890'
  },
  app: {
    get: jest.fn().mockReturnValue('development')
  }
};

describe('Testing User Controller', () => {
  const controller = userController(dependencies);
  it('should return object addNewUser, getUserById, updateUser, deleteUser, and getAllUsers properties', () => {
    expect.assertions(2);
    expect(controller).toBeInstanceOf(Object);
    expect(controller).toMatchObject({
      addNewUser: expect.any(Function),
      getUserById: expect.any(Function),
      updateUser: expect.any(Function),
      deleteUser: expect.any(Function),
      getAllUsers: expect.any(Function)
    });
  });
});

describe('Testing User Controller', () => {
  const controller = userController(dependencies);
  const {
    addNewUser, getUserById, updateUser, deleteUser, getAllUsers
  } = controller;

  describe('Testing addNewUser function', () => {
    const res = {
      json: jest.fn().mockReturnValue(user)
    };
    it('should add new user to the db and return success', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await addNewUser(req, res, next);
      } catch (err) {
        expect(UserRepo.add).toHaveBeenCalled();
      } finally {
        done();
      }
    });

    it('should throw an Error when it fails to add new user', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await addNewUser({ ...req, body: {} }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getUserById function', () => {
    const res = {
      json: jest.fn().mockReturnValue(user)
    };
    it('should get user by id from the db and return the user', async (done) => {
      expect.assertions(3);
      const userInstance = await getUserById(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(UserRepo.getById).toHaveBeenCalled();
      expect(userInstance).toBe(user);
      done();
    });

    it('should throw an Error when it fails to get user by Id', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await getUserById({ ...req, params: { userId: null } }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing updateUser function', () => {
    const res = {
      json: jest.fn().mockReturnValue(user)
    };
    it('should update user in the db and return the updated user', async (done) => {
      expect.assertions(3);
      const userInstance = await updateUser({ ...req, body: { phoneNumber: '08065556884' } }, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(UserRepo.update).toHaveBeenCalled();
      expect(userInstance).toBe(user);
      done();
    });

    it('should throw an Error when it fails to update the user', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await updateUser({ ...req, params: { userId: null } }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing deleteUser function', () => {
    const res = {
      json: jest.fn().mockReturnValue(user)
    };
    it('should delete user from the db and return the deleted user', async (done) => {
      expect.assertions(3);
      const userInstance = await deleteUser(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(UserRepo.delete).toHaveBeenCalled();
      expect(userInstance).toBe(user);
      done();
    });

    it('should throw an Error when it fails to delete the user', async (done) => {
      expect.assertions(1);
      try {
        const userInstance = await deleteUser({ ...req, params: { userId: null } }, res, next);
      } catch (err) {
        expect(err).toBeInstanceOf(Object);
      } finally {
        done();
      }
    });
  });

  describe('Testing getAllUsers function', () => {
    const res = {
      json: jest.fn().mockReturnValue(mockData)
    };
    it('should get and return all users', async (done) => {
      expect.assertions(3);
      const userInstances = await getAllUsers(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(UserRepo.getAll).toHaveBeenCalled();
      expect(userInstances).toBe(mockData);
      done();
    });
  });
});
