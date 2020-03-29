const express = require('express');
const router = express.Router();
const BlankAssigned = require('../models/BlankAssigned');
const bodyParser = require('body-parser');

router.post('/', (q, a) => {
    // const { blankNumber, assigned, used, batch } = q.body;
    //Blank.create(q.body).then(item => a.json(item));
    //console.log(q.body);
    const f = String(q.body.batchValues);
    //console.log(f);
   // console.log(q.param.batchValues);
    var x = f.split("-");
    var c = (x[0]);
    var d = (x[1]);
    //console.log(c);
    //console.log(d);
    let amount = d-c;
    let remain = [];

    for (i=0; i<= d-c; i++){
        remain.push(parseInt(c)+i)
    }

    console.log(remain);
      //  {start: c, end:d}];


    assignedBlanks = {
        batchStart: c,
        batchEnd: d,
        batchValues: q.body.batchValues,
        date: q.body.date,
        batchType: q.body.batchType,
        amount: amount,
        advisorCode: q.body.advisorCode,
        batchId: q.body.batchId,
        remaining: remain
    };

    BlankAssigned.create(assignedBlanks, (err, assignedBlanks) => {
        if (err) {
            console.log("problem selling: " + err);
        } else {
            console.log(assignedBlanks);
        }

    });
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    BlankAssigned.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});

router.get('/byDate',(q,a)=>{
    // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;

    //console.log(q.url);
    BlankAssigned.find({date:{$lte:ed, $gte:sd}})
        .then(blanks => a.json(blanks));


});

//find and update one blank
router.put('/:id', (q, a) => {
    BlankAssigned.findByIdAndUpdate(q.params.id, q.body).then(item => a.json(item));
});
//Delete one blank
router.delete('/:id', (q, a) => {
    BlankAssigned.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
