const express = require('express');
const router = express.Router();

// Image model
const Image = require('../../models/Image');


router.post('/upload', function(req, res) {
    const upload = require("../../upload");
    upload(req, res,(error) => {
        if(error){
            res.redirect('/?msg=3');
        }
        else{
            if(req.file == undefined){

                res.redirect('/?msg=2');

            }else{

                /**
                 * Create new record in mongoDB
                 */
                var fullPath = "files/"+req.file.filename;
                var document = {
                    path:     fullPath,
                    caption:   req.body.caption
                };

                var photo = new Image(document);
                photo.save(function(error){
                    if(error){
                        throw error;
                    }
                    res.redirect('/?msg=1');
                });
            }
        }
    });
});

module.exports = router;
