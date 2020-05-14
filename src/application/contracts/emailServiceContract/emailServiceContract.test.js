/* eslint-disable no-unused-vars */
import EmailServiceContract from './emailServiceContract';

describe('DataBase Contract InitDatabase method', () => {
  it('should throw new Error("not implemented")', async (done) => {
    const contract = new EmailServiceContract();
    expect.assertions(1);
    try {
      const value = await contract.notify();
    } catch (err) {
      expect(err).toStrictEqual(Error('not implemented'));
    } finally {
      done();
    }
  });
});
