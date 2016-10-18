'use strict';

const express = require('express');
const server = express();
const port = process.env.PORT || 2000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learn',function(err,res){
    if(err) { console.log('Connect to database failed'); }
    else { console.log('Connect successfully'); }
});

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Api = require('./Api');
const login = require('./Login/login.js');
const cases = require('./Cases-a/case.js');
const requirements = require('./Requirem-a/requirem.js');
const evaluations = require('./Evalua-a/eval.js');
const pictures = require('./Picture/picture.js');

server.use('/public',express.static('public'));

const router = express.Router();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());

server.use('/welcome',function(req,res){
    res.json({message:'welcome to Loser\'s api!'});
});

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


server.listen(port,function(error) {
	if (error) {
		console.error(error);
	} else {
		console.log('* Listening on http://localhost:'+ port);
		console.log('* Use Ctrl-C to stop');
	}
})