const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoChunks = new Schema({
       files_id: String,
       n: String,
       data: String},
    { collection : 'photos.chunks' });

module.exports = mongoose.model('PhotoChunks', photoChunks, 'photos.chunks');
