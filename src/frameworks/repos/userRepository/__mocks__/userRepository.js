/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
export default class UserRepository {
  // eslint-disable-next-line no-empty-function
  constructor() {}

  async add(userInstance) {
    try {
      if (userInstance) {
        return Promise.resolve(userInstance);
      }
      throw new Error('test failed to add new user');
    } catch (err) {
      return Promise.reject(new Error('test failed to add new user'));
    }
  }

  async getByEmail(emailAddress) {
    const user = {
      _id: '5eb172dfe13bbc0433426c2a',
      firstName: 'Uwem',
      lastName: 'Nkereuwem',
      emailAddress: 'uwemakan@gmail.com',
      phoneNumber: '09064907927',
      stateOfOrigin: 'Akwa Ibom',
      nationality: 'Nigerian',
      address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
      createdAt: '58868758319',
      messages: [],
      photo: 'ajks;aowejowe',
      location: 'Lago'
    };

    try {
      if (emailAddress === user.emailAddress) {
        return Promise.resolve(user);
      }
      throw new Error('test user not found');
    } catch (err) {
      return Promise.reject(new Error('test user not found'));
    }
  }

  async getAll() {
    const users = [
      {}, {}, {}, {}
    ];
    return Promise.resolve(users);
  }
}
