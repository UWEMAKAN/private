/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { ObjectId } from 'mongodb';
import mongodbService from '../../../frameworks/databaseService/mongoDBService';
import RepoContract from './repositoryContract';
import logger from '../../../common/winston';

class Repository extends RepoContract {
  constructor(driver) {
    super();
    this.service = mongodbService(driver);
    this.collection = 'collection';
  }

  async add(itemInstance) {
    try {
      const { insertOne } = this.service.operations;
      const item = await this.service.execute(this.collection, insertOne, itemInstance);
      return item;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection.slice(0, -1)} not added`);
    }
  }

  async update(itemId, update) {
    const { updateOne } = this.service.operations;
    const id = { _id: new ObjectId(itemId) };
    try {
      const item = await this.service.execute(this.collection, updateOne, id, update);
      return item;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection.slice(0, -1)} not updated`);
    }
  }

  async getById(itemId) {
    const { findOne } = this.service.operations;
    const id = { _id: new ObjectId(itemId) };
    try {
      const item = await this.service.execute(this.collection, findOne, id);
      return item;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection.slice(0, -1)} not found`);
    }
  }

  async getAll(query = null) {
    const { find } = this.service.operations;
    try {
      const items = await this.service.execute(this.collection, find, query);
      return items;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection} not found`);
    }
  }

  async delete(itemId) {
    const { deleteOne } = this.service.operations;
    const id = { _id: new ObjectId(itemId) };
    try {
      const item = await this.service.execute(this.collection, deleteOne, id);
      return item;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection.slice(0, -1)} not deleted`);
    }
  }

  async deleteAll() {
    const { deleteMany } = this.service.operations;
    try {
      const items = await this.service.execute(this.collection, deleteMany);
      return items;
    } catch (err) {
      logger.debug(err);
      throw new Error(`${this.collection} not deleted`);
    }
  }
}

export default Repository;
