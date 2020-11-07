const userSchema = {
  "type": "object",
  "properties": {
     "name": {
        "type": "string",
        "example": "Bobby101",
        "required": true
     },
     "address": {
        "type": "string",
        "example": "Mayaguez 101 street",
        "required": true
     },
     "email": {
      "type": "string",
      "example": "estudiante@colegio.com",
      "required": true,
      "unique": true
     },
     "phone": {
      "type": "string",
      "example": "estudiante@colegio.com",
      "required": false,
     },
     "password": {
      "type": "string",
      "example": "********",
      "required": true
     },
     "ishost": {
      "type": "boolean",
      "example": false,
      "required": true
     },
     "commentHistory": {
      "type": "array",
      "items": {
         "type": "object",
         "properties": {
            "place" : {
               "type" : "string",
            },
            "date" : {
               "type" : "string",
            },
            "comment" : {
               "type" : "string",
            },
         }
      }
     },
     "hashtags": {
      "type": "array",
      "items": {
        "type":"string"
      },
      "example": ['foodies', 'hangout'],
      "required": false
     },  
  }
};

module.exports = userSchema