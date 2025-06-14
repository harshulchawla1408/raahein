import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import packageJson from '../package.json' with { type: 'json' };

// To replace __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Raahein Travel API',
      version: packageJson.version,
      description: 'API documentation for Raahein Travel Platform',
      contact: {
        name: 'Raahein Support',
        email: 'support@raahein.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://api.raahein.com/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the token with the `Bearer ` prefix',
        },
      },
      schemas: {
        Destination: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Goa' },
            description: { type: 'string', example: 'Famous for its beautiful beaches...' },
            estimatedCost: { type: 'number', example: 35000 },
            duration: { type: 'string', example: '5 days' },
            bestTimeToVisit: { type: 'string', example: 'November to February' },
            activities: {
              type: 'array',
              items: { type: 'string' },
              example: ['Beach hopping', 'Water sports', 'Dolphin spotting'],
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Error message describing the issue' },
            error: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 400 },
                status: { type: 'string', example: 'fail' },
                message: { type: 'string', example: 'Detailed error message' },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'error',
                message: 'Please authenticate',
              },
            },
          },
        },
        ValidationError: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'fail',
                message: 'Validation Error',
                errors: [
                  {
                    msg: 'Age must be between 1 and 120',
                    param: 'age',
                    location: 'body',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../controllers/*.js'),
  ],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
