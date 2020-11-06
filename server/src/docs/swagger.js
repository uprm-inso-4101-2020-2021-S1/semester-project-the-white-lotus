
const placeSchema = require("./schemas/placeSchema")
const filterSchema = require("./schemas/filterSchema")
const postSchema = require("./schemas/postSchema")

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
    openapi: "3.0.0",
    "components": {
      "schemas": {
         "Posts": {...postSchema},
         "Place": {...placeSchema},
         "Place-Filter": {...filterSchema},
      }
    }
  },
  // Directory to routes
  // ex to find within a folder ['./routes/*.js']
  apis: ["./src/api/*.js", "../models/Posts"]
};

module.exports = swaggerOptions