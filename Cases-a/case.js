const express = require('express');
const Case = require('../Cases-a');
const router = express.Router();

router.post('/',function(req, res) {
        const cas = new Case();       
        cas.set({
            title : req.body.title,
            money : req.body.money,
            quota : req.body.quota,
            cycle : req.body.cycle,
            days : req.body.days,
            types : req.body.types,
            differences : req.body.differences 
        }); 
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
router.get('/:_id', function(req,res){
    Case.findById(req.params._id, function(err,cas){
        if(err) res.send(err);
        res.json(cas);
    });
});
router.put('/:_id', function(req, res) {
    Case.findById(req.params._id, function(err, cas) {
        if (err) res.send(err);
        if (req.body.title)  cas.title = req.body.title;
        if (req.body.money)  cas.money = req.body.money;
        if (req.body.quota)  cas.quota = req.body.quota;
        if (req.body.cycle)  cas.cycle = req.body.cycle;
        if (req.body.days)  cas.days = req.body.days;
        if (req.body.types)  cas.types = req.body.types;
        if (req.body.differences)  cas.differences = req.body.differences;   

        cas.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Case updated!' });
        });

    });
});
router.delete('/:_id',function(req, res) {
    Case.remove({ _id: req.params._id}, 
        function(err, cas) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});


module.exports = router;