import DatabaseService from './databaseService';

const client = {
  close: jest.fn(),
  db: jest.fn()
};
const mongoClient = {
  connect: jest.fn().mockReturnValue(client)
};

describe('Testing DataBaseService class', () => {
  const databaseService = new DatabaseService(mongoClient);

  describe('Testing the initDatabase method', () => {
    it('should initialize db', async (done) => {
      expect.assertions(1);
      try {
        await databaseService.initDatabase();
      } catch (err) {
        expect(mongoClient.connect).toBeCalled();
      } finally {
        done();
      }
    });
  });
});

it('description', () => {

});
