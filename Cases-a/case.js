const express = require('express');
const Case = require('../Cases-a');
const router = express.Router();

router.post('/',function(req, res) {
        const cas = new Case();       
        cas.title = req.body.title;
        cas.money = req.body.money;
        cas.quota = req.body.quota;
        cas.cycle = req.body.cycle;
        cas.days = req.body.days;
        cas.types = req.body.types;
        cas.differences = req.body.differences;  
        cas.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Case created!' });
        });

    });
router.get('/',function(req, res) {
        Case.find(function(err, cases) {
            if (err)
                res.send(err);

            res.json(cases);
        });
    });

//查改删
router.get('/:cas_id', function(req,res){
    Case.findById(req.params.cas_id, function(err,cas){
        if(err) res.send(err);
        res.json(cas);
    });
});
router.put('/:cas_id', function(req, res) {
    Case.findById(req.params.cas_id, function(err, cas) {
        if (err) res.send(err);
        if (req.body.title != null) { cas.title = req.body.title; }
        if (req.body.money != null) { cas.money = req.body.money; }
        if (req.body.quota != null) { cas.quota = req.body.quota; }
        if (req.body.cycle != null) { cas.cycle = req.body.cycle; }
        if (req.body.days != null) { cas.days = req.body.days; }
        if (req.body.types != null) { cas.types = req.body.types; }
        if (req.body.differences != null) { cas.differences = req.body.differences; }    

        cas.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Case updated!' });
        });

    });
});
router.delete('/:cas_id',function(req, res) {
    Case.remove({ _id: req.params.cas_id}, 
        function(err, cas) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});


module.exports = router;