const filterSchema = {
  "type": "object",
  "properties": {
    "mainCategory": {
        "type": "string",
        "example": "Nature",
        "required": false
    },
    "ambience": {
        "type": "string",
        "example":  [
          "Serene",
          "Casual"
        ],
        "required": false
    },
    "mood": {
      "type": "string",
      "example": [
        "Calm",
        "Relax"
      ],
      "required": false
    },
    "currentLocation": {
      "type": "string",
      "example": "TODO add example",
      "required": false
    },
    "preferredDistance": {
      "type": "string",
      "example": "TODO add example",
      "required": false
    },
    "budget": {
      "type": "string",
      "example": ["5","15"],
      "required": false
    },
  }
};

module.exports = filterSchema