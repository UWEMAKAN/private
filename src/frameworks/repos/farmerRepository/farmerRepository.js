// import { ObjectId } from 'mongodb';
import Repository from '../../../application/contracts/reposContract/repository';
import logger from '../../../common/winston';

class FarmerRepository extends Repository {
  constructor(driver) {
    super(driver);
    this.collection = 'farmers';
  }

  async addProduct(farmerId, productId) {
    try {
      const farmer = await this.getById(farmerId);
      const { products } = farmer;
      products.push(productId.toString());
      const updatedFarmer = await this.update(farmerId, { products });
      return updatedFarmer;
    } catch (err) {
      logger.debug(err);
      throw new Error('product not added');
    }
  }
}

export default FarmerRepository;
