import express from 'express';
import cors from 'cors';
import config, { consts } from './config/config';
import { router } from './routes/routes';

const app = express();
app.use(express.json());

app.use(cors({ origin: config.clientUrl, credentials: true }));

// health check
app.get('/health', (_, res) =>
  res.json({
    status: 'ok',
    version: consts.API_VERSION,
    message: 'Test message -> check github actions and deployment',
  }),
);

app.use(`/api/${consts.API_VERSION}`, router);

export default app;
