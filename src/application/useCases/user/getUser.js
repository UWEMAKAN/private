const getUser = (UserRepository) => {
  async function Execute(userId) {
    const user = await UserRepository.getById(userId);
    return user;
  }
  return {
    Execute
  };
};

export default getUser;
