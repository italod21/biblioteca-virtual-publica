const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca Virtual Pública API',
      version: '1.0.0',
      description: 'Documentação da API da Biblioteca Virtual Pública',
    },
    servers: [
        {
            url: 'http://localhost:4000',
        },
    ],

  },
  apis: [path.join(__dirname, '../routes/*.js')], // ✅ Caminho robusto
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
