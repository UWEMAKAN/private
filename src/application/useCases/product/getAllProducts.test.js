import getAllProducts from './getAllProducts';
import { products } from '../../../mockData';

const ProductRepository = {
  getAll: jest.fn(async () => products)
};

describe('Testing method getAll use case getAllProducts', () => {
  const command = getAllProducts(ProductRepository);
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
    expect(product).toBeInstanceOf(Array);
    done();
  });
});
