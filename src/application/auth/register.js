const register = (AuthRepository) => {
  async function Execute(data) {
    if (
      !data.firstName || !data.lastName || !data.emailAddress || !data.phoneNumber
      || !data.password || !data.confirmPassword || data.password !== data.confirmPassword
      || !data.isFarmer
    ) {
      throw new Error('validation failed');
    }

    const user = await AuthRepository.getByEmail(data.emailAddress);
    if (user) {
      throw new Error('email already exists');
    }

    const newRegistration = await AuthRepository.register(data);
    const {
      firstName, lastName, emailAddress, phoneNumber, _id
    } = newRegistration.ops[0];
    return {
      firstName, lastName, emailAddress, phoneNumber, _id
    };
  }

  return {
    Execute
  };
};

export default register;
