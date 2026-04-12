import express from 'express';
import cors from 'cors';
import config, { consts } from './config/config';
import { router } from './routes/routes';

const app = express();
app.use(express.json());

app.use(cors({ origin: config.clientUrl, credentials: true }));

app.use(`/api/${consts.API_VERSION}`, router);

export default app;
