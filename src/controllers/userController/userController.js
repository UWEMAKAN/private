/* eslint-disable consistent-return */
import AddUser from '../../application/useCases/user/addUser';
import GetAllUsers from '../../application/useCases/user/getAllUsers';
import GetUser from '../../application/useCases/user/getUser';
import UpdateUser from '../../application/useCases/user/updateUser';
import DeleteUser from '../../application/useCases/user/deleteUser';
import errorHandler from '../../common/ErrorHandler';

const controller = (dependencies) => {
  const { DatabaseService } = dependencies;
  const { UserRepo } = DatabaseService;
  const { EmailService } = dependencies;

  async function addNewUser(req, res, next) {
    const AddUserCommand = AddUser(UserRepo, EmailService);
    const data = req.body;
    try {
      const response = await AddUserCommand.Execute(data);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getUserById(req, res, next) {
    const GetUserCommand = GetUser(UserRepo);
    const { userId } = req.params;
    try {
      const response = await GetUserCommand.Execute(userId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function updateUser(req, res, next) {
    const UpdateUserCommand = UpdateUser(UserRepo);
    const { userId } = req.params;
    const update = req.body;
    try {
      const response = await UpdateUserCommand.Execute(userId, update);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function deleteUser(req, res, next) {
    const DeleteUserCommand = DeleteUser(UserRepo);
    const { userId } = req.params;
    try {
      const response = await DeleteUserCommand.Execute(userId);
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  async function getAllUsers(req, res, next) {
    const GetAllUsersCommand = GetAllUsers(UserRepo);
    try {
      const response = await GetAllUsersCommand.Execute();
      return res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  return {
    addNewUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
  };
};

export default controller;
