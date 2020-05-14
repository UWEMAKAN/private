/* eslint-disable no-unused-vars */
import mongoDBService from './mongoDBService';

const docs = {
  toArray: jest.fn().mockReturnValue([])
};
const func = (d = null) => (d ? docs : Promise.reject(new Error('failed')));
const document = {
  insertOne: jest.fn(func),
  insertMany: jest.fn(func),
  findOne: jest.fn(func),
  findById: jest.fn(func),
  find: jest.fn().mockReturnValue(docs),
  updateOne: jest.fn(func),
  deleteOne: jest.fn(func),
  deleteMany: jest.fn(func)
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
const collection = 'users';
const service = mongoDBService(mongoClient);

describe('Testing mongoDBService', () => {
  it('should return an object containing two properties execute: function and operations: object', () => {
    expect.assertions(2);
    expect(typeof service).toBe('object');
    expect(service).toMatchObject({
      operations: expect.any(Object),
      execute: expect.any(Function)
    });
  });
});

describe('Testing the execute method of mongodb service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  const { execute } = service;

  describe('Testing default case', () => {
    it('should return an object when called with correct args', async (done) => {
      const { insertOne } = service.operations;
      expect.assertions(1);
      const user = await execute(collection);
      expect(user).toBe(null);
      done();
    });
  });

  describe('Testing insertOne', () => {
    it('should return an object when called with correct args', async (done) => {
      const { insertOne } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, insertOne, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { insertOne } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, insertOne);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing insertMany', () => {
    it('should return an object when called with correct args', async (done) => {
      const { insertMany } = service.operations;
      expect.assertions(1);
      const users = await execute(collection, insertMany, docs);
      expect(users).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { insertMany } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, insertMany);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing findOne', () => {
    it('should return an object when called with correct args', async (done) => {
      const { findOne } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, findOne, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { findOne } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, findOne);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing findById', () => {
    it('should return an object when called with correct args', async (done) => {
      const { findById } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, findById, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { findById } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, findById);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing find', () => {
    it('should return an object when called with correct args', async (done) => {
      const { find } = service.operations;
      expect.assertions(1);
      const users = await execute(collection, find);
      expect(users).toStrictEqual([]);
      done();
    });
  });

  describe('Testing updateOne', () => {
    it('should return an object when called with correct args', async (done) => {
      const { updateOne } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, updateOne, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { updateOne } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, updateOne);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing deleteOne', () => {
    it('should return an object when called with correct args', async (done) => {
      const { deleteOne } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, deleteOne, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { deleteOne } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, deleteOne);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });

  describe('Testing deleteMany', () => {
    it('should return an object when called with correct args', async (done) => {
      const { deleteMany } = service.operations;
      expect.assertions(1);
      const user = await execute(collection, deleteMany, docs);
      expect(user).toBe(docs);
      done();
    });
    it('should throw an Error("failed") when called with incorrect args', async (done) => {
      const { deleteMany } = service.operations;
      expect.assertions(2);
      try {
        await execute(collection, deleteMany);
      } catch (err) {
        expect(typeof err).toBe('object');
        expect(err instanceof Error).toBe(true);
      } finally {
        done();
      }
    });
  });
});
