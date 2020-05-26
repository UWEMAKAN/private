/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import Repository from '../../../application/contracts/reposContract/repository';
import logger from '../../../common/winston';

class UserRepository extends Repository {
  constructor(driver) {
    super(driver);
    this.collection = 'users';
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
}

export default UserRepository;
