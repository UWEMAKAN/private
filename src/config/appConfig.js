import fs from 'fs';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import appRoot from 'app-root-path';

const config = (app) => {
  const accessLogStream = fs.createWriteStream(`${appRoot}/dist/logs/access.log`, { flags: 'a' });

  morgan.token('time', (tokens, req, res) => {
    let responseTime = `${Math.round(tokens['response-time'](req, res))}`;
    if (responseTime.length < 2) {
      responseTime = `0${responseTime}`;
    }
    return `${responseTime}ms`;
  });
  morgan.token('path', (tokens, req, res) => {
    let requestPath = `${tokens.url(req, res)}`;
    if (requestPath.endsWith('/')) {
      requestPath = requestPath.slice(0, requestPath.length - 1);
    }
    return requestPath;
  });

  app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.path(tokens, req, res),
    tokens.status(req, res),
    tokens.time(tokens, req, res)
  ].join('\t\t'), {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode === 404 || req.originalUrl === '/'
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
};

export default config;
