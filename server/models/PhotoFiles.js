const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoFileSchema = new Schema({
    length: String,
    chunkSize: String,
    uploadDate: String,
    filename: String,
    md5: String,
    contentType: String},
    { collection : 'photos.files'});

module.exports = mongoose.model('PhotoFiles', photoFileSchema, 'photos.files');
