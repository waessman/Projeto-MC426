const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '0.1.0',
    },
  },
  apis: ['scr/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
