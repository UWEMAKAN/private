const deleteProduct = (FarmerRepository, ProductRepository) => {
  async function Execute(farmerId, productId) {
    const farmer = await FarmerRepository.getById(farmerId);
    const prodId = farmer.products.find((value) => value === productId);
    if (!prodId) {
      throw new Error('not my product');
    }
    const productIds = farmer.products.filter((value) => value !== productId);
    await ProductRepository.delete(productId);
    await FarmerRepository.update(farmerId, { products: productIds });
    return 'success';
  }
  return {
    Execute
  };
};

export default deleteProduct;
