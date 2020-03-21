const express = require('express');
const router = express.Router();
//TODO: fix error handling
const Blank = require('../models/Blank');

router.post('/', (q, a) => {
    // const { blankNumber, assigned, used, batch } = q.body;
    //Blank.create(q.body).then(item => a.json(item));
    const f = toString(q.body[0].batchValues);
    const b = f.indexOf("-");
    const c = parseInt(f.substring(0,b));
    const d = parseInt(f.substring(b+1));

    let amount = d-c;
    let batchTp = "";
    if (f.substring(0-2)==="201"){
        batchTp = "Domestic";
    }
    else{
        batchTp = "Interline";
    }

        newBlanks = {
            ticketNumber: q.body[0].ticketNumber,
            batchValues: q.body[0].batchValues,
            date: Date.now(),
            batchType: batchTp,
            amount: amount,
            advisorCode: q.body[0].advisorCode,
            assigned: q.body[0].assigned,
            used: q.body[0].used

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

//find and update one blank
router.put('/:id', (q, a) => {
    Blank.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
});
//TODO issue with deleting bc wouldn't match with sales deletion
//Delete one blank
router.delete('/:id', (q, a) => {
    Blank.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
