const express = require('express');
const Requirem = require('../Requirem-a');
const router = express.Router();

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
            res.json({ message: 'Requirement created!' });
        });

    });

router.get('/',function(req, res) {
        Requirem.find(function(err, requs) {
            if (err)
                res.send(err);

            res.json(requs);
        });
    });

router.delete('/:_id',function(req, res) {
    Requirem.remove({ _id: req.params._id }, 
        function(err, cas) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;