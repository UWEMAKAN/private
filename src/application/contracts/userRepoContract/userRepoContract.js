/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

class UserRepoContract {
  // eslint-disable-next-line no-empty-function
  constructor() {}

  async add(userInstance) {
    throw new Error('not implemented');
  }

  async update(userInstance, properties) {
    throw new Error('not implemented');
  }

  async delete(userInstance) {
    throw new Error('not implemented');
  }

  async getById(userId) {
    throw new Error('not implemented');
  }

  async getByEmail(emailAddress) {
    throw new Error('not implemented');
  }

  async getAll() {
    throw new Error('not implemented');
  }

  async addMessage(userInstance, message) {
    throw new Error('not implemented');
  }

  async addNotification(userInstance, notification) {
    throw new Error('not implemented');
  }
}

export default UserRepoContract;
