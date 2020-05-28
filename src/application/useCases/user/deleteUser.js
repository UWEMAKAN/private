const deleteUser = (UserRepository) => {
  async function Execute(userId) {
    await UserRepository.delete(userId);
    return 'success';
  }
  return {
    Execute
  };
};

export default deleteUser;
