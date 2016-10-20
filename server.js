'use strict';

//搭建服务端口
const express = require('express');
const server = express();
const port = process.env.PORT || 2000;

//mongodb数据库连接
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learn',function(err,res){
    if(err) { console.log('Connect to database failed'); }
    else { console.log('Connect successfully'); }
});

//中间件
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//路由路径
const Api = require('./Api');
const login = require('./Login/login.js');
const cases = require('./Cases-a/case.js');
const requirements = require('./Requirem-a/requirem.js');
const evaluations = require('./Evalua-a/eval.js');
const pictures = require('./Picture/picture.js');

//静态文件路径
server.use('/public',express.static('public'));

//中间件参数
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());

//欢迎页
server.use('/welcome',function(req,res){
    res.json({message:'welcome to Loser\'s api!'});
});

//主页跳转到显示账户名页面
server.get('/',function(req,res) {
	res.redirect('/login');
});
server.use('/login',login);

//API下的路由
const router = express.Router();
server.use('/api',router);
router.use(function(req,res,next){
	console.log('something is happening');
	next();
})
router.get('/',function(req,res){
    res.json(Api);
});
router.use('/cases', cases);
router.use('/requirements', requirements);
router.use('/evaluations', evaluations);
router.use('/pictures', pictures);

//监听端口
server.listen(port,function(error) {
	if (error) {
		console.error(error);
	} else {
		console.log('* Listening on http://localhost:'+ port);
		console.log('* Use Ctrl-C to stop');
	}
})