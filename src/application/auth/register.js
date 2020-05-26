const register = (AuthRepository) => {
  async function Execute(data) {
    if (
      !data.firstName || !data.lastName || !data.emailAddress || !data.phoneNumber
      || !data.password || !data.confirmPassword || data.password !== data.confirmPassword
    ) {
      throw new Error('validation failed');
    }

    const user = await AuthRepository.getByEmail(data.emailAddress);
    if (user) {
      throw new Error('email already exists');
    }

    const newRegistration = await AuthRepository.register(data);

    return newRegistration;
  }

  return {
    Execute
  };
};

export default register;
