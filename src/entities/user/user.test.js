import User from './user';

jest.mock('./user');

describe('Testing User Constructor', () => {
  const data = {
    firstName: 'Uwem',
    lastName: 'Nkereuwem',
    emailAddress: 'uwemakan@gmail.com',
    phoneNumber: '09064907927',
    stateOfOrigin: 'Akwa Ibom',
    nationality: 'Nigerian',
    address: '1B Bayo Adeyemo Street, Oke-Ira, Ogba, Lagos',
    photo: 'ajks;aowejowe',
    location: 'Lago'
  };

  test('should create user', () => {
    expect.assertions(1);
    const user = new User(data);
    expect(user instanceof User).toBeTruthy();
  });
});
