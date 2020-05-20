import http from 'http';
import express from 'express';
import authRoutes from './frameworks/web/routes/authRoutes/authRoutes';
import routes from './frameworks/web/routes/index';
import authorization from './frameworks/web/middlewares/authorization/authorization';
import reposFactory from './factory/reposFactory';
import config from './config/appConfig';
import logger from './common/winston';

const app = express();
const PORT = process.env.PORT || 4000;

config(app);
const requireAuth = authorization(reposFactory);

app.use('/api', requireAuth, routes(reposFactory));
app.use('/auth', authRoutes(reposFactory));
app.get('/', (req, res) => res.send('Up and Running'));
app.all('*', (req, res) => res.status(404).send('Ooops! Not Found!!!'));

export const server = http.createServer(app);
reposFactory.DatabaseService.initDatabase()
  .then(() => {
    server.listen(PORT, () => {
      logger.debug(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.info(err);
  });

export default app;
