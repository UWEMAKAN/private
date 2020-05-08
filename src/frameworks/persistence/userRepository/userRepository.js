/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import UserRepoContract from '../../../application/contracts/userRepoContract/userRepoContract';
import logger from '../../../common/winston';

const dbName = 'Agrotech';
const url = 'mongodb://localhost:27017';

class UserRepository extends UserRepoContract {
  constructor(driver) {
    super();
    this.driver = driver;
  }

  async add(userInstance) {
    try {
      const client = await this.driver.connect(
        url, { useUnifiedTopology: true, useNewUrlParser: true }
      );
      const db = client.db(dbName);

      const user = await db.collection('users').insertOne(userInstance);
      client.close();
      return Promise.resolve(user);
    } catch (err) {
      logger.debug(err);
      return Promise.reject(new Error('failed to add new user'));
    }
  }

  async getByEmail(emailAddress) {
    try {
      const client = await this.driver.connect(
        url, { useUnifiedTopology: true, useNewUrlParser: true }
      );
      const db = client.db(dbName);

      const user = await db.collection('users').findOne({ emailAddress });
      client.close();
      return Promise.resolve(user);
    } catch (err) {
      logger.debug(err);
      return Promise.reject(new Error('user not found'));
    }
  }
}

export default UserRepository;
