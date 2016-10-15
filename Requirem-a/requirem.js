const express = require('express');
const Requirem = require('../Requirem-a');
const router = express.Router();

router.post('/',function(req, res) {
        const requ = new Requirem();       
        requ.projectTypes = req.body.projectTypes;
        requ.projectBudget = req.body.projectBudget;
        requ.projectCycles = req.body.projectCycles;
        requ.project = req.body.project;
        requ.names = req.body.names;
        requ.cellphoneNumber = req.body.cellphoneNumber;
        requ.describe = req.body.describe;
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

router.delete('/:requ_id',function(req, res) {
    Requirem.remove({ _id: req.params.requ_id}, 
        function(err, cas) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;