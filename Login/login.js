const express = require('express');
const Login = require('../Login');
const router = express.Router();
const jwt = require('jsonwebtoken');

//找到库中存在admin的name并转化为数组
var users = new Array();
	Login.find({}, {_id:0, name:1 },function(err,ss){
		if (err) console.error(err);
		users = ss.map((doc) => {
	  	return doc.name;
		});
		return users;
	});
//函数判定
const exists = function(username) {
	var y = false;

	users.map((item, index) => {
	   	if (username == item) {
	   		y = true;
	  		return
	   	}
	 });
	return y;
}


//新增管理
router.post('/new_user', function(req, res) {
	
	if(exists(req.body.name))
		return res.json('用户已存在,注册失败');
	const admin = new Login({
		name: req.body.name,
		password: req.body.password
	});
	admin.save( function(err) {
		if(err) res.send(err);
		res.json('注册成功');
	});
});

//登陆管理
router.post('/', function(req, res) {
	Login.findOne({'name': req.body.name}, function(err, admin) {
		if(admin.password === req.body.password) {
			jwt.sign({userId: admin._id},
				'secretKey',
				{algorithm: 'HS256'},
				function(err, token) {					
					res.json({token: token})
				}
				);
		}
		else res.json('登陆失败');
	});
});

//退出管理
router.delete('/', function(req, res) {
	res.json('登出管理');
});

//查看成员(无密码)
router.get('/',function(req, res) {
    Login.find({}, {_id:0, name:1 },function(err, login) {
        if (err)
            res.send(err);

        res.json(login);
    });
});

module.exports = router;
