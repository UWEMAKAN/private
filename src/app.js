import http from 'http';
import express from 'express';
import routes from './frameworks/web/routes/index';
import reposFactory from './factory/reposFactory';
import config from './config/appConfig';
import logger from './common/winston';

const app = express();
const PORT = process.env.PORT || 4000;

config(app);

app.use('/api', routes(reposFactory));

app.get('/', (req, res) => res.send('Up and Running'));

app.all('*', (req, res) => res.status(404).send('Ooops! Not Found!!!'));

export const server = http.createServer(app);
server.listen(PORT, () => {
  logger.debug(`Listening on port ${PORT}`);
});

export default app;
