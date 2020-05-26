/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import redis from 'redis';
import DatabaseServiceContract from '../../application/contracts/databaseServiceContract/databaseServiceContract';
import UserRepository from '../repos/userRepository/userRepository';
import AuthRepository from '../repos/authRepository/authRepository';
import mockData from '../../mockData';
import User from '../../entities/user/user';
import logger from '../../common/winston';

class DatabaseService extends DatabaseServiceContract {
  constructor(driver) {
    super();
    this.UserRepo = new UserRepository(driver);
    this.AuthRepo = new AuthRepository(driver, bcrypt, redis, promisify);
  }

  async initDatabase() {
    try {
      await this.UserRepo.deleteAll();
      await this.seedData();
    } catch (err) {
      logger.debug(err);
      throw new Error('init failed');
    }
  }

  async seedData() {
    mockData.map(async (data) => {
      const user = new User(data);
      try {
        const newUser = await this.UserRepo.add(user);
      } catch (err) {
        logger.debug(err);
        throw new Error('seeding DB failed');
      }
    });
  }
}

export default DatabaseService;
