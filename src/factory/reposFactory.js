import UserRepository from '../frameworks/persistence/userRepository/userRepository';
import EmailService from '../frameworks/otherServices/emailService';
import mongoClient from '../frameworks/dbDrivers/mongoDriver';

const reposFactory = () => ({
  DatabaseService: {
    UserRepo: new UserRepository(mongoClient)
  },
  EmailService
});

export default reposFactory();
