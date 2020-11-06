const placeSchema = {
  "type": "object",
  "properties": {
    "name": {
        "type": "string",
        "example": "Rumba",
        "required": true
     },
    "email": {
        "type": "string",
        "example": "rumba@eat.com",
        "required": true
     },
    "phone": {
      "type": "string",
      "example": "7873060306",
      "required": true
    },
    "longitude": {
      "type": "string",
      "example": "40.7143528",
      "required": true
    },
    "latitude": {
      "type": "string",
      "example": "40.7143528",
      "required": true
    },
    "address": {
      "type": "string",
      "example": "Carr 455 Km. 11.7",
      "required": true
    },
    "city": {
      "type": "string",
      "example": "Ciudad Langosta",
      "required": true
    },
    "country": {
      "type": "string",
      "example": "Treasure Island",
      "required": true
    },
    "mood": {
      "type": "array",
      "items": {
        "type":"string"
      },
      "example": ['Happy', 'Sad'],
      "required": true
    },
    "comments": {
      "type": "array",
      "items": {
        "type":"string"
      },
      "example": ['This is a', 'comment'],
      "required": true
    },
    "photos": {
      "data": "buffer",
      "contentType": "string",
      "required": false
    },
    "hashtags": {
      "type": "array",
      "items": {
        "type":"string"
      },
      "example": ['foodies', 'hangout'],
      "required": false
    },
    "ambience": {
      "type": "array",
      "items": {
        "type":"string"
      },
      "example": ['Calm', 'Serene'],
      "required": true
    },
    "maximumPrice": {
      "type": "string",
      "example": "35",
      "required": true
    },
    "minimumPrice": {
      "type": "string",
      "example": "60",
      "required": true
    },
    "category": {
      "type": "string",
      "example": "Nature",
      "required": true
    },  
  }
};

module.exports = placeSchema