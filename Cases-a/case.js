const express = require('express');
const Case = require('../Cases-a');
const router = express.Router();
const jwt = require('jsonwebtoken');

//新增案例
router.post('/',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err)
            return res.json('请先登录账号');
        const cas = new Case();       
        cas.set({
            title : req.body.title,
            money : req.body.money,
            quota : req.body.quota,
            cycle : req.body.cycle,
            days : req.body.days,
            types : req.body.types,
            differences : req.body.differences, 
            photoUrl: req.body.photoUrl,
            pics: req.body.pics,
            description: req.body.description,
            accomplish: req.body.accomplish
        }); 
        cas.save(function(err) {
            if (err)
                res.send(err);
            res.json('添加成功');
        });
    });
});
//查看案例
router.get('/',function(req, res) {
        Case.find(function(err, cases) {
            if (err)
                res.send(err);

            res.json(cases);
        });
    });

//查改删
router.get('/:_id', function(req,res){
    Case.findById(req.params._id, function(err,cas){
        if(err) res.send(err);
        res.json(cas);
    });
});
router.patch('/:_id', function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err)
            return res.json('请先登录账号');
        Case.findById(req.params._id, function(err, cas) {
            if (err) res.send(err);
            if (req.body.title)  cas.title = req.body.title;
            if (req.body.money)  cas.money = req.body.money;
            if (req.body.quota)  cas.quota = req.body.quota;
            if (req.body.cycle)  cas.cycle = req.body.cycle;
            if (req.body.days)  cas.days = req.body.days;
            if (req.body.types)  cas.types = req.body.types;
            if (req.body.differences)  cas.differences = req.body.differences;
            if (req.body.photoUrl)  cas.photoUrl = req.body.photoUrl;
            if (req.body.pics)  cas.pics = req.body.pics;
            if (req.body.description)  cas.description = req.body.description;
            if (req.body.accomplish)  cas.accomplish = req.body.accomplish;   

            cas.save(function(err) {
                if (err) res.send(err);
                res.json('案例已更新');
            });
        });
    });
});
router.delete('/:_id',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err)
            return res.json('请先登录账号');
        Case.remove({ _id: req.params._id}, 
            function(err, cas) {
            if (err) res.send(err);
            res.json('已删除');
        });
    });
});


module.exports = router;