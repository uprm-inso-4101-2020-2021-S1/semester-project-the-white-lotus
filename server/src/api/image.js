const express = require('express');

const router = express.Router();
const { to } = require('../utils');
const uploadController = require("../../controllers/UploadController");

const PhotoFiles = require('../../models/PhotoFiles');
const PhotoChunks = require('../../models/PhotoChunks');

router.get('/all', async (req, res) => {
    const images = await PhotoFiles.find();

    res.send(images);
});
router.get('/all/chunks', async (req, res) => {
    const images = await PhotoChunks.find();

    res.send(images);
});
router.post("/upload",async (req, res) => {
    try {
        res.send(await uploadController.uploadFiles(req,res).then(r => {return r;}));
    }
    catch(error){
        console.log(error);
    }
});
router.delete('/delete/:id', async (req, res) => {
    const [err1, result1] = await to(PhotoFiles.deleteOne({ _id: req.params.id }));
    const [err2, result2] = await to(PhotoChunks.deleteOne({ _id: req.params.id }));
    return res.send(result1);
});

module.exports = router;
