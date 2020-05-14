import { MongoClient } from 'mongodb';
import EmailService from '../frameworks/emailService/emailService';
import DatabaseService from '../frameworks/databaseService/databaseService';

const reposFactory = () => ({
  DatabaseService: new DatabaseService(MongoClient),
  EmailService
});

export default reposFactory();
