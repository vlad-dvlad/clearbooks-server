import swaggerJsdoc from 'swagger-jsdoc';
import config, { consts } from './config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ClearBooks API',
      version: '1.0.0',
      description: 'REST API for ClearBooks — Generate your invoice',
    },
    servers: [
      { url: `http://localhost:${config.port}/api/${consts.API_VERSION}`, description: 'Local' },
      {
        url: `https://clearbooks-api-staging.up.railway.app/api/${consts.API_VERSION}`,
        description: 'Production',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.router.ts'],
};

export const swaggerSpec: object = swaggerJsdoc(options);
