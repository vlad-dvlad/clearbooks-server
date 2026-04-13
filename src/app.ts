import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';
import config, { consts } from './config/config';
import { router } from './routes/routes';
import { Routes } from './config/routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());

app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(Routes.apiDoc, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

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
