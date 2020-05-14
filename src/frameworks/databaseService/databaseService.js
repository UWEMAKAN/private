/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import DatabaseServiceContract from '../../application/contracts/databaseServiceContract/databaseServiceContract';
import UserRepository from '../repos/userRepository/userRepository';
import mockData from '../../mockData';
import User from '../../entities/user/user';
import logger from '../../common/winston';

class DatabaseService extends DatabaseServiceContract {
  constructor(driver) {
    super();
    this.UserRepo = new UserRepository(driver);
  }

  async initDatabase() {
    try {
      await this.UserRepo.deleteAll();
    } catch (err) {
      logger.debug(err);
      throw new Error('init failed');
    } finally {
      this.seedData();
    }
  }

  async seedData() {
    mockData.map(async (data) => {
      const user = new User(data);
      const newUser = await this.UserRepo.add(user);
    });
  }
}

export default DatabaseService;
