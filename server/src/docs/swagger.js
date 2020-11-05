
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
         "Posts": {...postSchema} 
      }
    }
  },
  // Directory to routes
  // ex to find within a folder ['./routes/*.js']
  apis: ["./src/api/posts.js", "../models/Posts"]
};

module.exports = swaggerOptions