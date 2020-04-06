const express = require('express');
const router = express.Router();
const BlankUsed = require('../models/BlankUsed');

router.post('/', (q, a) => {
    // const { blankNumber, assigned, used, batch } = q.body;
    //Blank.create(q.body).then(item => a.json(item));


    usedBlanks = {
        batchValues: q.body.batchValues,
        date: q.body.date,
        advisorCode: q.body.advisorCode,
        bacthId: q.body.batchId,
        custName: q.body.custName

    };

    BlankUsed.create(usedBlanks, (err, usedBlanks) => {
        if (err) {
            console.log("problem selling: " + err);
        } else {
            console.log(usedBlanks);
        }

    });
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    BlankUsed.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});

router.get('/byDate',(q,a)=>{
    // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;

    console.log(q.url);
    BlankUsed.find({date:{$lte:ed, $gte:sd}})
        .then(blanks => a.json(blanks));


});

//find and update one blank
router.put('/:id', (q, a) => {
    BlankUsed.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//Delete one blank
router.delete('/:id', (q, a) => {
    BlankUsed.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
