import AddUser from '../application/useCases/user/addUser';
import errorHandler from '../common/ErrorHandler';

const controller = (dependencies) => {
  const { DatabaseService } = dependencies;
  const { UserRepo } = DatabaseService;
  const { EmailService } = dependencies;

  async function addNewUser(req, res, next) {
    const AddUserCommand = AddUser(UserRepo, EmailService);
    const data = req.body;
    try {
      const response = await AddUserCommand.Execute(data);
      await res.json(response);
    } catch (err) {
      err.status = 400;
      errorHandler(err, req, res, next);
    }
  }

  return {
    addNewUser
  };
};

export default controller;
