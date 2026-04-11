import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseHost: string;
  databaseName: string;
  databasePassword: string;
  databaseUser: string;
  databasePort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseHost: process.env.DATABSE_HOST || '',
  databaseName: process.env.DATABASE_NAME || '',
  databasePassword: process.env.DATABASE_PASSWORD || '',
  databaseUser: process.env.DATABASE_USER || '',
  databasePort: Number(process.env.DATABASE_PORT),
};

export default config;
