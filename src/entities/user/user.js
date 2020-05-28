/* eslint-disable no-underscore-dangle */
class User {
  constructor(data) {
    this._id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.emailAddress = data.emailAddress;
    this.phoneNumber = data.phoneNumber;
    this.stateOfOrigin = data.stateOfOrigin;
    this.nationality = data.nationality;
    this.address = data.address;
    this.createdAt = Date();
    this.messages = [];
    this.photo = data.photo;
    this.location = data.location;
  }
}

export default User;
