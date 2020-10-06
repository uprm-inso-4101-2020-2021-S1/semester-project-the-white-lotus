const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'RumbaPR API',
      description: 'The REST API for the RumbaPR web application.',
      version: '1.0.0',
      contact: {
        name: 'The White Lotus'
      },
    },
    basePath: '/api/v2',
    servers: [
      { 
        url: "http://localhost:5000/api/v2",
        description: "Local server"
      }
    ],
    openapi: "3.0.0"
  },
  // Directory to routes
  // ex to find within a folder ['./routes/*.js']
  apis: ["./src/api/posts.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get('/', (req, res) => {
  res.json({
    message: '✨🌎Server is running!🌏✨'
  });
});

app.use('/api/v1', api);
app.use('/api/v2', routes);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
