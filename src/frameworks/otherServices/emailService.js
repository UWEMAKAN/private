/* eslint-disable no-unused-vars */
import logger from '../../common/winston';

const emailService = () => {
  const notify = (object) => {
    logger.debug('you have been notified!');
  };

  return {
    notify
  };
};

export default emailService();
