const express = require('express');
const Requirem = require('../Requirem-a');
const router = express.Router();
const jwt = require('jsonwebtoken');

//新增需求
router.post('/',function(req, res) {
        const requ = new Requirem();       
        requ.set({
            projectTypes : req.body.projectTypes,
            projectBudget : req.body.projectBudget,
            projectCycles : req.body.projectCycles,
            project : req.body.project,
            names : req.body.names,
            cellphoneNumber : req.body.cellphoneNumber,
            describe : req.body.describe
        });
        requ.save(function(err) {
            if (err)
                res.send(err);
            res.json('已添加');
        });

    });

//查看所有
router.get('/',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err) 
            return res.json('请先登录');
        Requirem.find(function(err, requs) {
            if (err)
                res.send(err);
            res.json(requs);
        });
    });
});

//查看单个
router.get('/:_id',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err) 
            return res.json('请先登录');
        Requirem.find({ _id: req.params._id },
            function(err, requ) {
            if (err)
                res.send(err);
            res.json(requ);
        });
    });
});

//删除需求
router.delete('/:_id',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err) 
            return res.json('请先登录');
        Requirem.remove({ _id: req.params._id }, 
            function(err, cas) {
            if (err) 
                res.send(err);
            res.json('已删除');
        });
    });
});

//更新需求
router.patch('/:_id',function(req, res) {
    const token = req.query.token;
    jwt.verify(token, 'secretKey', function(err){
        if(err) 
            return res.json('请先登录');
        Requirem.findById(req.params._id,
            function(err, requ) {
            if (err)
                res.send(err);
            if(req.body.projectTypes)  
                requ.projectTypes = req.body.projectTypes;
            if(req.body.projectBudget)  
                requ.projectBudget = req.body.projectBudget;
            if(req.body.projectCycles)  
                requ.projectCycles = req.body.projectCycles;
            if(req.body.project)  
                requ.project = req.body.project;
            if(req.body.names)  
                requ.names = req.body.names;
            if(req.body.cellphoneNumber)  
                requ.cellphoneNumber = req.body.cellphoneNumber;
            if(req.body.describe)  
                requ.describe = req.body.describe;
            requ.save(function(err) {
                if(err)
                    res.send(err);
                res.json(requ);
            });             
        });
    });
});

module.exports = router;