/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { ObjectId } from 'mongodb';
import mongodbService from '../../databaseService/mongoDBService';
import UserRepoContract from '../../../application/contracts/userRepoContract/userRepoContract';
import logger from '../../../common/winston';

class UserRepository extends UserRepoContract {
  constructor(driver) {
    super();
    this.service = mongodbService(driver);
    this.collection = 'users';
  }

  async add(userInstance) {
    try {
      const { insertOne } = this.service.operations;
      const user = await this.service.execute(this.collection, insertOne, userInstance);
      return user;
    } catch (err) {
      logger.debug(err);
      throw new Error('failed to add new user');
    }
  }

  async update(userId, update) {
    const { updateOne } = this.service.operations;
    const id = { _id: new ObjectId(userId) };
    try {
      const user = await this.service.execute(this.collection, updateOne, id, update);
      return user;
    } catch (err) {
      logger.debug(err);
      throw new Error('user not found');
    }
  }

  async getByEmail(emailAddress) {
    const { findOne } = this.service.operations;
    try {
      const user = await this.service.execute(this.collection, findOne, { emailAddress });
      return user;
    } catch (err) {
      logger.debug(err);
      throw new Error('user not found');
    }
  }

  async getById(userId) {
    const { findOne } = this.service.operations;
    const id = { _id: new ObjectId(userId) };
    try {
      const user = await this.service.execute(this.collection, findOne, id);
      return user;
    } catch (err) {
      logger.debug(err);
      throw new Error('user not found');
    }
  }

  async getAll(query = null) {
    const { find } = this.service.operations;
    try {
      const users = await this.service.execute(this.collection, find, query);
      return users;
    } catch (err) {
      logger.debug(err);
      throw new Error('users not found');
    }
  }

  async delete(userId) {
    const { deleteOne } = this.service.operations;
    const id = { _id: new ObjectId(userId) };
    try {
      const user = await this.service.execute(this.collection, deleteOne, id);
      return user;
    } catch (err) {
      logger.debug(err);
      throw new Error('user not found');
    }
  }

  async deleteAll() {
    const { deleteMany } = this.service.operations;
    try {
      const users = await this.service.execute(this.collection, deleteMany);
      return users;
    } catch (err) {
      logger.debug(err);
      throw new Error('deletion failed');
    }
  }
}

export default UserRepository;
