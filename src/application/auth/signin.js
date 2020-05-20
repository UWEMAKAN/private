const register = (AuthRepository) => {
  async function Execute(data, authorization) {
    if (
      !data.emailAddress || !data.password
    ) {
      throw new Error('validation failed');
    }

    const response = await AuthRepository.signinAuthentication(data, authorization);
    return response;
  }

  return {
    Execute
  };
};

export default register;
