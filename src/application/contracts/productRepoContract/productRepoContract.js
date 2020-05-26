/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import RepositoryContract from '../reposContract/repositoryContract';

class ProductRepoContract extends RepositoryContract {
  async getProduct(productInfo) {
    throw new Error('not implemented');
  }
}

export default ProductRepoContract;
