import getAllUsers from './getAllUsers';
import mockData from '../../../mockData';

const UserRepository = {
  getAll: jest.fn(async () => mockData)
};

describe('Testing method getAll use case getAllUsers', () => {
  const command = getAllUsers(UserRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should return a list of users', async (done) => {
    const users = await Execute();
    expect.assertions(1);
    expect(users).toBeInstanceOf(Array);
    done();
  });
});
