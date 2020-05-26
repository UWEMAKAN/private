class Product {
  constructor(data) {
    this.name = data.name;
    this.category = data.category;
    this.quantity = data.quantity;
    this.price = data.price;
    this.ownerId = data.ownerId;
    this.soldOut = false;
    this.createdAt = Date();
  }
}

export default Product;
