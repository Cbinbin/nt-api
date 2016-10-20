const express = require('express');
const Picture = require('../Picture');
const router = express.Router();
const jwt = require('jsonwebtoken');

//传入图片URL
router.post('/',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err) {
        if(err) 
            return res.json('请先登录账号');
        const pic = new Picture();       
        pic.url = req.body.url;
         
        pic.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'PictureUrl created!' });
        });
    });
});

//显示库中的URL
router.get('/',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err) {
        if(err) 
            return res.json('请先登录账号');
        Picture.find(function(err, picUrls) {
            if (err)
                res.send(err);

            res.json(picUrls);
        });
    });
});

//删除某个URL
router.delete('/:_id',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err) {
        if(err) 
            return res.json('请先登录账号');
        Picture.remove({ _id: req.params._id}, 
            function(err, pic) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });
});

module.exports = router;