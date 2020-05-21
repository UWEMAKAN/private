/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
// import { ObjectId } from 'mongodb';

import jwt from 'jsonwebtoken';
import mongodbService from '../../databaseService/mongoDBService';
import logger from '../../../common/winston';

class AuthRepository {
  constructor(driver, bcrypt, redis, promisify) {
    this.service = mongodbService(driver);
    this.collection = 'register';
    this.redisClient = redis.createClient({ host: process.env.REDIS_URI || '127.0.0.1' });
    this.bcrypt = bcrypt;
    this.saltRounds = 10;
    this.promisify = promisify;
  }

  async register(input) {
    const {
      firstName, lastName, emailAddress, password, phoneNumber
    } = input;
    try {
      const salt = await this.bcrypt.genSalt(this.saltRounds);
      const hash = await this.bcrypt.hash(password, salt);
      const data = {
        firstName, lastName, emailAddress, phoneNumber, hash
      };
      const { insertOne } = this.service.operations;
      const newRegistration = await this.service.execute(this.collection, insertOne, data);
      return newRegistration;
    } catch (err) {
      logger.debug(err);
      throw new Error('new registration failed');
    }
  }

  async getByEmail(emailAddress) {
    const { findOne } = this.service.operations;
    try {
      const registeredUser = await this.service.execute(this.collection, findOne, { emailAddress });
      return registeredUser;
    } catch (err) {
      logger.debug(err);
      throw new Error('user not found');
    }
  }

  async signinAuthentication(data, authorization) {
    try {
      if (authorization) {
        return this.getAuthTokenId(authorization);
      }
      const { emailAddress, password } = data;
      const verifiedUser = await this.verifyUser(emailAddress, password);
      const session = await this.createSessions(verifiedUser);
      return session;
    } catch (err) {
      logger.debug(err);
      throw new Error('invalid login credentials');
    }
  }

  async signoutAuthentication(authorization) {
    const token = authorization.split(' ')[1];
    const delAsync = this.promisify(this.redisClient.del).bind(this.redisClient);
    try {
      const reply = await delAsync(token);
      if (reply) {
        return reply;
      }
      throw new Error('Unauthorized');
    } catch (err) {
      logger.debug(err);
      throw new Error('signout failed');
    }
  }

  async verifyUser(emailAddress, password) {
    const { findOne } = this.service.operations;
    try {
      const registeredUser = await this.service.execute(this.collection, findOne, { emailAddress });
      const { hash } = registeredUser;
      const isValid = await this.bcrypt.compare(password, hash);
      if (isValid) {
        return registeredUser;
      }
      throw new Error('invalid login credentials');
    } catch (err) {
      logger.debug(err);
      throw new Error('invalid login credentials');
    }
  }

  async getAuthTokenId(authorization) {
    const token = authorization.split(' ')[1];
    const getAsync = this.promisify(this.redisClient.get).bind(this.redisClient);
    try {
      const reply = await getAsync(token);
      if (reply) {
        return { id: reply };
      }
      throw new Error('not found');
    } catch (err) {
      logger.debug(err);
      throw new Error('could not get value');
    }
  }

  async signToken(emailAddress) {
    const jwtPayload = { emailAddress };
    return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
  }

  async setToken(key, value) {
    const setAsync = this.promisify(this.redisClient.set).bind(this.redisClient);
    try {
      const token = await setAsync(key, value);
      if (token) {
        return token;
      }
      throw new Error('cannot set token');
    } catch (err) {
      logger.debug(err);
      throw new Error('key value not set');
    }
  }

  async createSessions(user) {
    const { emailAddress, _id } = user;
    const id = _id.toString();
    try {
      const token = await this.signToken(emailAddress);
      const isSet = await this.setToken(token, id);
      return isSet ? { success: 'true', userId: id, token } : null;
    } catch (err) {
      logger.debug(err);
      throw new Error('failed to create session');
    }
  }

  async isAuthorized(authorization) {
    const token = authorization.split(' ')[1];
    const getAsync = this.promisify(this.redisClient.get).bind(this.redisClient);
    try {
      const reply = await getAsync(token);
      if (reply) {
        return reply;
      }
      throw new Error('Unauthorized');
    } catch (err) {
      logger.debug(err);
      throw new Error('Unauthorized');
    }
  }
}

export default AuthRepository;
