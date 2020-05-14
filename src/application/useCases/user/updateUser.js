const updateUser = (UserRepository) => {
  async function Execute(userId, update) {
    await UserRepository.update(userId, update);
    const updatedUser = await UserRepository.getById(userId);
    return updatedUser;
  }
  return {
    Execute
  };
};

export default updateUser;
