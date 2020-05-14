const deleteUser = (UserRepository) => {
  async function Execute(userId) {
    const deletedUser = await UserRepository.delete(userId);
    return deletedUser;
  }
  return {
    Execute
  };
};

export default deleteUser;
