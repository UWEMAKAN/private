const updateProduct = (FarmerRepository, ProductRepository) => {
  async function Execute(farmerId, productId, update) {
    const farmer = await FarmerRepository.getById(farmerId);
    const prodId = farmer.products.find((value) => value === productId);
    if (!prodId) {
      throw new Error('not my product');
    }
    await ProductRepository.update(productId, update);
    return 'success';
  }
  return {
    Execute
  };
};

export default updateProduct;
