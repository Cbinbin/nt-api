const express = require('express');
const Eval = require('../Evalua-a');
const router = express.Router();


router.get('/',function(req, res) {
    Eval.find(function(err, evals) {
        if (err)
            res.send(err);

        res.json(evals);
    });
});

module.exports = router;