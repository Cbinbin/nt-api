const express = require('express');
const Login = require('../Login');
const router = express.Router();


router.get('/',function(req, res) {
    Login.find(function(err, login) {
        if (err)
            res.send(err);

        res.json(login);
    });
});

module.exports = router;
