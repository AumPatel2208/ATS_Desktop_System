const express = require('express');
const router = express.Router();
const Blank = require('../models/Blank');

router.post('/', (q, a) => {
    // const { blankNumber, assigned, used, batch } = q.body;
    //Blank.create(q.body).then(item => a.json(item));

    const f = String(q.param.batchValues);
console.log(f);
    console.log(q.param.batchValues);
    var x = f.split("-");
    var c = (x[0]);
    var d = (x[1]);
    console.log(c);
    console.log(d);
    let amount = d-c;

    let batchTp = "";
    if (f.substring(0-2)==="201"){
        batchTp = "Domestic";
    }
    else{
        batchTp = "Interline";
    }

        newBlanks = {
            batchValues: q.param.batchValues,
            date: q.param.date,
            batchType: batchTp,
            amount: amount,
            advisorCode: q.param.advisorCode,
            assigned: q.param.assigned,
            used: q.param.used

        };

        Blank.create(newBlanks, (err, newBlanks) => {
            if (err) {
                console.log("problem selling: " + err);
            } else {
                console.log(newBlanks);
            }

        });
    });

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    Blank.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});

router.get('/byDate',(q,a)=>{
   // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;

    console.log(q.url);
    Blank.find({date:{$lte:ed, $gte:sd}})
        .then(blanks => a.json(blanks));


    });

//find and update one blank
router.put('/:id', (q, a) => {
    Blank.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//Delete one blank
router.delete('/:id', (q, a) => {
    Blank.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
