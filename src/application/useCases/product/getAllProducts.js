const getAllProducts = (ProductRepository) => {
  async function Execute() {
    const products = await ProductRepository.getAll();
    return products;
  }

  return {
    Execute
  };
};

export default getAllProducts;
