/* eslint-disable no-unused-vars */
import RepoContract from './repositoryContract';

const contract = new RepoContract();
describe('testing the add method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.add();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});

describe('testing the update method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.update();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});

describe('testing the delete method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.delete();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});

describe('testing the getById method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.getById();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});

describe('testing the getAll method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    expect.assertions(1);
    try {
      const value = await contract.getAll();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});
