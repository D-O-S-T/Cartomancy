// backend/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API EREMITA',
      version: '1.0.0',
      description: 'Documentação da API do Projeto EREMITA',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    tags: [
      {
        name: 'Usuários',
        description: 'Endpoints relacionados aos usuários do sistema',
      },
      {
        name: 'Trilhas',
        description: 'Gerenciamento das trilhas de aprendizado',
      },
      {
        name: 'Anotações',
        description: 'Criação e edição de anotações de conteúdo',
      },
      {
        name: 'Cartas',
        description: 'Consulta às cartas de Tarot (somente leitura)',
      },
    ],
  },
  apis: ['./routes/*.js'], // Mantém como está
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
