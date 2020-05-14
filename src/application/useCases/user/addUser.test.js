/* eslint-disable no-unused-vars */
import addUser from './addUser';
import User from '../../../entities/user/user';
import logger from '../../../common/winston';

const data = {
  firstName: 'Uwem',
  lastName: 'Nkereuwem',
  emailAddress: 'uwemakan@gmail.com',
  phoneNumber: '09064907927',
  stateOfOrigin: 'Akwa Ibom',
  nationality: 'Nigerian',
  address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
  photo: 'ajks;aowejowe',
  location: 'Lagos'
};

const user = new User(data);

const EmailService = {
  notify: () => {
    logger.debug('you have been notified');
  }
};

const UserRepository = {
  add: jest.fn(async (userInstance) => Promise.resolve(userInstance)),

  getByEmail: jest.fn(async (emailAddress) => (emailAddress === 'uwemakan@gmail.com' ? null : user))
};

describe('Testing use case addUser', () => {
  const command = addUser(UserRepository, EmailService);
  const { Execute } = command;

  it('should return a function Execute', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should throw new Error validation failed if any required field is missing', async (done) => {
    const incompleteData = {
      lastName: 'Nkereuwem',
      emailAddress: 'uwemakan@gmail.com',
      phoneNumber: '09064907927',
      stateOfOrigin: 'Akwa Ibom',
      nationality: 'Nigerian',
      address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
      photo: 'ajks;aowejowe',
      location: 'Lago'
    };
    expect.assertions(1);
    try {
      const newUser = await Execute(incompleteData);
    } catch (err) {
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });

  it('should throw new Error user already exists if emailAddress exists', async (done) => {
    const userData = { ...data, emailAddress: 'uwemakan12@gmail.com' };
    expect.assertions(1);
    try {
      const newUser = await Execute(userData);
    } catch (err) {
      expect(err).toStrictEqual(Error('email already exists'));
    } finally {
      done();
    }
  });

  it('should return the newUser if all conditions are met', async (done) => {
    expect.assertions(1);
    const newUser = await Execute(data);
    expect(newUser instanceof User).toBeTruthy();
    done();
  });
});
