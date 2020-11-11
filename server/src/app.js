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
const swaggerOptions = require('./docs/swagger');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

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
