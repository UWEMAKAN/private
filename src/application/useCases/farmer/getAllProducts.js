const getAllProducts = (FarmerRepository, ProductRepository) => {
  async function Execute(farmerId) {
    const farmer = await FarmerRepository.getById(farmerId);
    if (!farmer) {
      throw new Error('farmer not found');
    }
    const productIds = farmer.products;
    const products = Promise.all(productIds.map(async (productId) => {
      const product = await ProductRepository.getById(productId);
      return product;
    }));
    return products;
  }

  return {
    Execute
  };
};

export default getAllProducts;
