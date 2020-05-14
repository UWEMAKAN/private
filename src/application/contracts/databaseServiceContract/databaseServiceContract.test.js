/* eslint-disable no-unused-vars */
import DataBaseServiceContract from './databaseServiceContract';

describe('DataBase Contract InitDatabase method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    const contract = new DataBaseServiceContract();
    expect.assertions(1);
    try {
      const value = await contract.initDatabase();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});
