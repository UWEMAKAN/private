/* eslint-disable no-unused-vars */
import addFarmer from './addFarmer';
import { farmers } from '../../../mockData';
import Farmer from '../../../entities/farmer/farmer';

const FarmerRepository = {
  getByEmail: jest.fn(async (email) => (email === 'test@test.com' ? farmers[0] : null)),
  add: jest.fn(async (farmer) => farmer)
};

const EmailService = {
  notify: jest.fn()
};

describe('Testing method getAll use case addFarmer', () => {
  const command = addFarmer(FarmerRepository, EmailService);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should return a list of product', async (done) => {
    expect.assertions(2);
    try {
      const product = await Execute({});
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
      expect(err).toStrictEqual(Error('validation failed'));
    } finally {
      done();
    }
  });

  it('should return a list of product', async (done) => {
    expect.assertions(1);
    try {
      const product = await Execute({ ...farmers[0], emailAddress: 'test@test.com' });
    } catch (err) {
      expect(err).toBeInstanceOf(Object);
    } finally {
      done();
    }
  });

  it('should return a list of product', async (done) => {
    expect.assertions(2);
    const farmer = await Execute(farmers[0]);
    expect(farmer).toBeInstanceOf(Farmer);
    expect(farmer).toHaveProperty('createdAt');
    done();
  });
});
