/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import { promisify } from 'util';
import bcrypt from 'bcrypt';
import redis from 'redis';
import DatabaseServiceContract from '../../application/contracts/databaseServiceContract/databaseServiceContract';
import UserRepository from '../repos/userRepository/userRepository';
import AuthRepository from '../repos/authRepository/authRepository';
import FarmerRepository from '../repos/farmerRepository/farmerRepository';
import mockData, { farmers, products } from '../../mockData';
import User from '../../entities/user/user';
import Farmer from '../../entities/farmer/farmer';
import logger from '../../common/winston';
import ProductRepository from '../repos/productRepository/productRepository';
import AddProduct from '../../application/useCases/farmer/addProduct';

class DatabaseService extends DatabaseServiceContract {
  constructor(driver) {
    super();
    this.UserRepo = new UserRepository(driver);
    this.AuthRepo = new AuthRepository(driver, bcrypt, redis, promisify);
    this.FarmerRepo = new FarmerRepository(driver);
    this.ProductRepo = new ProductRepository(driver);
  }

  async initDatabase() {
    try {
      await this.UserRepo.deleteAll();
      await this.FarmerRepo.deleteAll();
      await this.ProductRepo.deleteAll();
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
    farmers.map(async (data) => {
      const farmer = new Farmer(data);
      try {
        const newFarmer = await this.FarmerRepo.add(farmer);
        const { _id: farmerId } = newFarmer.ops[0];
        const AddProductCommand = AddProduct(this.FarmerRepo, this.ProductRepo);
        await AddProductCommand.Execute({ ...products[0], ownerId: farmerId });
        await AddProductCommand.Execute({ ...products[1], ownerId: farmerId });
        await AddProductCommand.Execute({ ...products[2], ownerId: farmerId });
        await AddProductCommand.Execute({ ...products[3], ownerId: farmerId });
      } catch (err) {
        logger.debug(err);
        throw new Error('seeding DB failed');
      }
    });
  }
}

export default DatabaseService;
