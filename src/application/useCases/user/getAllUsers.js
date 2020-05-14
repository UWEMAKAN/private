const getAllUsers = (UserRepository) => {
  async function Execute() {
    const users = await UserRepository.getAll();
    return users;
  }

  return {
    Execute
  };
};

export default getAllUsers;
