import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  clientUrl: string;
  databaseHost: string;
  databaseName: string;
  databasePassword: string;
  databaseUser: string;
  databasePort: number;
  r2Endpoint: string;
  r2AccessKeyId: string;
  r2SecretAccessKey: string;
  r2BucketName: string;
  r2PublicUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'localhost',
  databaseHost: process.env.DATABSE_HOST || '',
  databaseName: process.env.DATABASE_NAME || '',
  databasePassword: process.env.DATABASE_PASSWORD || '',
  databaseUser: process.env.DATABASE_USER || '',
  databasePort: Number(process.env.DATABASE_PORT),
  r2Endpoint: process.env.R2_ENDPOINT || '',
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || '',
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  r2BucketName: process.env.R2_BUCKET_NAME || '',
  r2PublicUrl: process.env.R2_PUBLIC_URL || '',
};

export const consts = {
  API_VERSION: 'v1',
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_SIZE: 2 * 1024 * 1024, // in MB
};

export default config;
