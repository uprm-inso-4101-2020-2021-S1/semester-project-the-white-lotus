const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
    url: process.env.MONGO_CREDENTIALS,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});
var uploadFiles = multer({ storage: storage }).array("multi-files", 2);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
