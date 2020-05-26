const getProduct = (FarmerRepository, ProductRepository) => {
  async function Execute(farmerId, productId) {
    const farmer = await FarmerRepository.getById(farmerId);
    const prodId = farmer.products.find((value) => value === productId);
    if (!prodId) {
      throw new Error('not my product');
    }
    const updatedProduct = await ProductRepository.getById(productId);
    return updatedProduct;
  }
  return {
    Execute
  };
};

export default getProduct;
