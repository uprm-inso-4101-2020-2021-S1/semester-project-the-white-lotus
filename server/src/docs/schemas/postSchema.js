const postSchema = {
  "type": "object",
  "properties": {
     "title": {
        "type": "string",
        "example": "The best title"
     },
     "content": {
        "type": "string",
        "example": "The best content"
     }
  }
};

module.exports = postSchema