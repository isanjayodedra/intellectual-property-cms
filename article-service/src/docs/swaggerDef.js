module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Intellectual Property CMS API',
      version: '1.0.0',
      description: 'API documentation for the Intellectual Property CMS project.',
      contact: {
        name: 'Sanjay Odedra',
        url: 'https://github.com/isanjayodedra',
        email: 'sanjay@yellowpanther.co.uk',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // for gateway-service
        description: 'Gateway Server',
      },
      {
        url: 'http://localhost:3001', // for auth-service
        description: 'Authentication Server',
      },
      {
        url: 'http://localhost:3002', // for common-service
        description: 'Common Server',
      },
      {
        url: 'http://localhost:3003', // for queue-service
        description: 'Queue Server',
      },
      {
        url: 'http://localhost:3004', // for article-service
        description: 'Article Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Reusable objects here later
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };