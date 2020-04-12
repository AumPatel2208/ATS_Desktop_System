const express = require('express');
const router = express.Router();
const Blank = require('../models/Blank');
const bodyParser = require('body-parser');

// POST blanks as a batch into the database
router.post('/', (q, a) => {
    console.log(q.body.batchValues);
    console.log(q.body);

    const f = String(q.body.batchValues);

    var x = f.split('-');
    var c = x[0];
    var d = x[1];
    console.log(c);
    console.log(d);
    //setting batch type
    let amount = d - c + 1;
    let remain = [{ start: c, end: d }];
    let batchTp = '';
    if (f.substring(0, 3) === '201') {
        batchTp = 'Domestic';
    } else if (f.substring(0, 3) === '440' || '420') {
        batchTp = 'Interline';
    }
    console.log('getting type' + f.substring(0, 3) + '  ' + batchTp);
    newBlanks = {
        batchValues: q.body.batchValues,
        batchStart: c,
        batchEnd: d,
        date: q.body.date,
        batchType: batchTp,
        amount: amount,
        remaining: remain,
    };
    Blank.create(newBlanks, (err, newBlanks) => {
        if (err) {
            console.log('problem selling: ' + err);
        } else {
            console.log(newBlanks);
        }
    });
});

// find all blanks, sorted by date added
router.get('/', (q, a) => {
    Blank.find()
        .sort({ date: -1 })
        .then((blanks) => a.json(blanks));
});

// GETing blanks assigned
router.get('/assign', (q, a) => {
    let s = q.query.start;
    let e = q.query.end;
    console.log(q.query);
    Blank.find()
        .sort({ date: -1 })
        .then((blanks) => a.json(blanks));
});

//get by id
router.get('/:id', (q, a) => {
    Blank.findById(q.params.id).then((item) => a.json(item));
});

//getting by date - doesn't work, use front filtering
router.get('/byDate', (q, a) => {
    let sd = q.query.start;
    let ed = q.query.end;
    Blank.find({ date: { $lte: ed, $gte: sd } }).then((item) => a.json(item));
});

//find and update one blank
router.put('/:id', (q, a) => {
    Blank.findByIdAndUpdate(q.params.id, q.body).then((item) => a.json(item));
    console.log('put' + q.body.remaining);
});

//find and update using parameters
router.put('/id', (q, a) => {
    let i = q.query.iden;
    Blank.find({ id: i }).then((blanks) => a.json(blanks));
    console.log('CALLING ANOTHER PUT');
});

//Delete one blank
router.delete('/:id', (q, a) => {
    Blank.findById(q.params.id)
        .then((blanks) => blanks.remove().then(() => a.json({ success: true })))
        .catch((err) => a.status(404).json({ success: false }));
});

module.exports = router;
