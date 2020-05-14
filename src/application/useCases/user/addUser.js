import User from '../../../entities/user/user';

const addUser = (UserRepository, EmailService) => {
  async function Execute(data) {
    if (
      !data.firstName || !data.lastName || !data.emailAddress
      || !data.phoneNumber || !data.stateOfOrigin || !data.nationality
      || !data.address || !data.photo || !data.location
    ) {
      throw new Error('validation failed');
    }

    const user = await UserRepository.getByEmail(data.emailAddress);
    if (user) {
      throw new Error('email already exists');
    }

    let newUser = new User(data);
    newUser = await UserRepository.add(newUser);
    await EmailService.notify(newUser);

    return newUser;
  }

  return {
    Execute
  };
};

export default addUser;
