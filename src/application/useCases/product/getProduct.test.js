import getProduct from './getProduct';
import { products } from '../../../mockData';

const ProductRepository = {
  getById: jest.fn(async () => products[0])
};

describe('Testing method getAll use case getProduct', () => {
  const command = getProduct(ProductRepository);
  const { Execute } = command;
  it('should return an object with property Execute that is a function', () => {
    expect.assertions(3);
    expect(command).toBeInstanceOf(Object);
    expect(command).toHaveProperty('Execute');
    expect(Execute).toBeInstanceOf(Function);
  });

  it('should return a list of product', async (done) => {
    const product = await Execute();
    expect.assertions(1);
    expect(product).toBeInstanceOf(Object);
    done();
  });
});
