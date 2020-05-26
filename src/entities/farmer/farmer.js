import User from '../user/user';

class Farmer extends User {
  constructor(data) {
    super(data);
    this.businessName = data.businessName;
    this.businessAddress = data.businessAddress;
    this.products = [];
  }
}

export default Farmer;
