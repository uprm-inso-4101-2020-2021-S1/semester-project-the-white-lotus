const postSchema = {
  "type": "object",
  "properties": {
     "title": {
        "type": "string",
        "example": "The best title",
        "required": true
     },
     "content": {
        "type": "string",
        "example": "The best content",
        "required": true
     }
  }
};

module.exports = postSchema