import Product from '../../../entities/product/product';

const addProduct = (FarmerRepository, ProductRepository) => {
  async function Execute(data) {
    if (
      !data.name || !data.category || !data.quantity
      || !data.price || !data.ownerId
    ) {
      throw new Error('validation failed');
    }

    const product = await ProductRepository.getProduct({ ownerId: data.ownerId, name: data.name });
    if (product) {
      throw new Error('product already exists');
    }

    let newProduct = new Product(data);
    newProduct = await ProductRepository.add(newProduct);
    // eslint-disable-next-line no-underscore-dangle
    await FarmerRepository.addProduct(data.ownerId, newProduct.ops[0]._id);

    return newProduct;
  }

  return {
    Execute
  };
};

export default addProduct;
