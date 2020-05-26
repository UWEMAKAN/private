const getProduct = (ProductRepository) => {
  async function Execute(productId) {
    const product = await ProductRepository.getById(productId);
    return product;
  }

  return {
    Execute
  };
};

export default getProduct;
