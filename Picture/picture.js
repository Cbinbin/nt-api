const express = require('express');
const Picture = require('../Picture');
const router = express.Router();

//传入图片URL
router.post('/',function(req, res) {
        const pic = new Picture();       
        pic.url = req.body.url;
         
        pic.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'PictureUrl created!' });
        });
    });
//显示库中的URL
router.get('/',function(req, res) {
        Picture.find(function(err, picUrls) {
            if (err)
                res.send(err);

            res.json(picUrls);
        });
    });
//删除某个URL
router.delete('/:pic_id',function(req, res) {
    Picture.remove({ _id: req.params.pic_id}, 
        function(err, pic) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;