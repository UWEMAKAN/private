/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import RepositoryContract from '../reposContract/repositoryContract';

class UserRepoContract extends RepositoryContract {
  // eslint-disable-next-line no-empty-function
  constructor() {
    super();
  }

  async getByEmail(emailAddress) {
    throw new Error('not implemented');
  }
}

export default UserRepoContract;
