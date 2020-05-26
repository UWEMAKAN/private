import logger from '../../../common/winston';
import Repository from '../../../application/contracts/reposContract/repository';

class ProductRepository extends Repository {
  constructor(driver) {
    super(driver);
    this.collection = 'products';
  }

  async getProduct(productInfo) {
    try {
      const { findOne } = this.service.operations;
      const product = await this.service.execute(this.collection, findOne, productInfo);
      return product;
    } catch (err) {
      logger.debug(err);
      throw new Error('product not found');
    }
  }
}

export default ProductRepository;
