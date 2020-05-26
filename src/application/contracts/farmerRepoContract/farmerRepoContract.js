/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import RepositoryContract from '../reposContract/repositoryContract';

class FarmerRepoContract extends RepositoryContract {
  async addProduct(farmerId, productId) {
    throw new Error('not implemented');
  }
}

export default FarmerRepoContract;
