import { Pool } from 'pg';
import config from '../config/config';

export const db: Pool = new Pool({
  host: config.databaseHost,
  port: config.databasePort,
  database: config.databaseName,
  password: config.databasePassword,
  user: config.databaseUser,
});
