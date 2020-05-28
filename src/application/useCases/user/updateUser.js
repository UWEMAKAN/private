const updateUser = (UserRepository) => {
  async function Execute(userId, update) {
    await UserRepository.update(userId, update);
    return 'success';
  }
  return {
    Execute
  };
};

export default updateUser;
