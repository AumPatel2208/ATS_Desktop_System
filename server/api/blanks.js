const express = require('express');
const router = express.Router();
const Blank = require('../models/Blank');
const bodyParser = require('body-parser');

router.post('/', (q, a) => {
    // const { blankNumber, assigned, used, batch } = q.body;
    //Blank.create(q.body).then(item => a.json(item));
    console.log(q.body.batchValues);
    console.log(q.body)



    const f = String(q.body.batchValues);
//console.log(f);

    var x = f.split("-");
    var c = (x[0]);
    var d = (x[1]);
    console.log(c);
    console.log(d);
    let amount = d-c;
    let remain = [{start: c, end:d}];
    let batchTp = "";
    if (f.substring(0-2)==="201"){
        batchTp = "Domestic";
    }
    else if (f.substring(0-2)==="440"||"420"){
        batchTp = "Interline";
    }

        newBlanks = {
            batchValues: q.body.batchValues,
            batchStart: c,
            batchEnd:d,
            date: q.body.date,
            batchType: batchTp,
            amount: amount,
            remaining: remain

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
    //console.log(q);
    Blank.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
});


router.get('/assign', (q, a) => {
    let s = q.query.start;
    let e = q.query.end;
    console.log(q.query);
    Blank.find()
        .sort({ date: -1 })
        .then(blanks => a.json(blanks));
    //console.log(a)
   // a.send("hello");
    /*
    //console.log(s,e)
    //Blank.findOne({batchStart: {$lte:s},batchEnd: {$gte:e}})
    var x;
    Blank.findOne({'batchStart' : s}, function (err, blank) {
        if (err) {
            console.log(err)
        } else {
            x = blank;
            a.json(x);

        }

    });
   // a.json(x);
       // .then(blanks => a.json(blanks));

  //  Blank._findOne

     */
});


router.get('/:id', (q, a) => {
    Blank.findById(q.params.id).then(item => a.json(item));
});

router.get('/byDate',(q,a)=>{
    // x = JSON.parse(q.body);
    let sd = q.query.start;
    let ed = q.query.end;

    //console.log(q.url);
    Blank.find({date:{$lte:ed, $gte:sd}})
        .then(blanks => a.json(blanks));

});

//find and update one blank
router.put('/:id', (q, a) => {
    //Blank.findByIdAndUpdate(q.params.id, q.body).then(a.json(post));
    Blank.findByIdAndUpdate(q.params.id, q.body).then(item => a.json(item));
});


router.put('/id', (q, a) => {
    let i = q.query.iden;
    Blank.find({id:i})
        .then(blanks => a.json(blanks))
});

//Delete one blank
router.delete('/:id', (q, a) => {
    Blank.findById(q.params.id)
        .then(blanks => blanks.remove().then(() => a.json({ success: true })))
        .catch(err => a.status(404).json({ success: false }));
});

module.exports = router;
